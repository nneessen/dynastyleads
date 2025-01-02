'use client';

import { useState } from 'react';
import Button from '@/ui/Button';
import Form from '@/ui/Form';
import FormField from '@/ui/FormField';
import SpinnerMini from '@/ui/SpinnerMini';
import toast from 'react-hot-toast';
import { loginUser } from '@/lib/auth/authService';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: 'nick@nickneessen.com',
    password: 'N123j234n345!$!$'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate using Zod
      loginSchema.parse(formData);

      setIsLoading(true);
      // Attempt the login call, which presumably sets cookies server-side
      const { user } = await loginUser({
        email: formData.email,
        password: formData.password
      });

      // If loginUser doesn't return a user object, user will be undefined
      // so check your backend if 'user' is actually returned.

      toast.success('Login successful!');
      setFormData({ email: '', password: '' });

      // If a parent component wants to do something after success, call onSuccess
      if (onSuccess) onSuccess(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod validation error
        toast.error(error.errors[0].message);
      } else {
        // Other error from server or fetch
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
      <Button $size="medium" $variation="primary" disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : 'Login'}
      </Button>
    </Form>
  );
}

export default LoginForm;
