'use client';

import { useState } from 'react';
import Button from '@/ui/Button';
import Form from '../../ui/Form/index.js';
import Input from '../../ui/Input/index.js';
import FormRowVertical from '../../ui/FormRowVertical/index.js';
import SpinnerMini from '../../ui/SpinnerMini/index.js';
import toast from 'react-hot-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

function LoginForm({ supabase, onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data using Zod
      loginSchema.parse(formData);

      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Login successful!');
      setFormData({ email: '', password: '' });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        toast.error(error.errors[0].message);
      } else {
        // Handle other errors
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} type="regular">
      <FormField
        label="Email Address"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <FormField
        label="Password"
        id="password"
        type="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <FormRowVertical>
        <Button $size="medium" $variation="primary" disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

function FormField({ label, id, type = 'text', ...props }) {
  return (
    <FormRowVertical label={label}>
      <Input type={type} id={id} {...props} />
    </FormRowVertical>
  );
}

export default LoginForm;
