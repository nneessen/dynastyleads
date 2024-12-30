'use client';

import { useState } from 'react';
import Button from '@/ui/Button';
import Form from '../../ui/Form/Form.js';
import Input from '../../ui/Input/Input.js';
import FormRowVertical from '../../ui/FormRowVertical/FormRowVertical.js';
import SpinnerMini from '../../ui/SpinnerMini/SpinnerMini.js';
import toast from 'react-hot-toast';

function LoginForm() {
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
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Login failed');
      }

      toast.success('Login successful!');
      setFormData({ email: '', password: '' });
    } catch (error) {
      toast.error(error.message);
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
