'use client';

import { useState } from 'react';
import Button from '@/ui/Button';
import Form from '@/ui/Form';
import FormField from '@/ui/FormField';
import SpinnerMini from '@/ui/SpinnerMini';
import toast from 'react-hot-toast';
import { loginUser } from '@/lib/auth/authService';

function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: 'nick@nickneessen.com',
    password: 'N123j234n345!$!$'
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { user } = await loginUser({
        email: formData.email,
        password: formData.password
      });

      toast.success('Login successful!');
      setFormData({ email: '', password: '' });

      if (onSuccess) onSuccess(user);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

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
