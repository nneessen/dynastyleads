import { useState } from 'react';
import { useLogin } from './useLogin';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: 'nick@nickneessen.com',
    password: 'N123j234n345!$!$'
  });

  const { isLoading, login } = useLogin();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return;

    login(formData, {
      onSettled: () => setFormData({ email: '', password: '' })
    });
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
