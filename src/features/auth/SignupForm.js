import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSignup } from './useSignup';

const Input = styled.input`
  display: flex;
  border: 1px solid
    ${(props) =>
      props.$hasError ? 'var(--color-red-500)' : 'var(--color-grey-300)'};
  width: 100%;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 0.5rem 0.9rem;
`;

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: span 2;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: var(--color-grey-700);
  margin-bottom: 0.5rem;
`;

const ErrorText = styled.span`
  color: var(--color-accent-red);
  font-size: 0.85rem;
  margin-top: 0.3rem;
  display: block;
`;

function SignupForm() {
  const [formData, setFormData] = useState({
    email: 'nick@nickneessen.com',
    password: 'N123j234n345!$!$',
    full_name: 'Nick Neessen',
    national_producer_number: '21272688',
    phone_number: '859-433-5907',
    agency: 'Self Made',
    date_of_birth: '1986-11-28',
    address_line_1: '123 main st',
    address_line_2: '',
    city: 'chicago',
    state: 'il',
    zip_code: '60610'
  });

  const [errors, setErrors] = useState({});
  const { isLoading, signup } = useSignup();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      'email',
      'password',
      'full_name',
      'national_producer_number',
      'phone_number',
      'agency',
      'date_of_birth',
      'address_line_1',
      'city',
      'state',
      'zip_code'
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signup(formData, {
      onSettled: () => {
        setFormData({
          email: '',
          password: '',
          full_name: '',
          national_producer_number: '',
          phone_number: '',
          agency: '',
          date_of_birth: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          zip_code: ''
        });
        setErrors({});
      }
    });
  };

  const fields = [
    { label: 'Full Name', id: 'full_name' },
    { label: 'National Producer Number', id: 'national_producer_number' },
    { label: 'Email Address', id: 'email', type: 'email' },
    { label: 'Password', id: 'password', type: 'password' },
    { label: 'Phone Number', id: 'phone_number', type: 'tel' },
    { label: 'Agency Name', id: 'agency' },
    { label: 'Date of Birth', id: 'date_of_birth', type: 'date' },
    { label: 'Address Line 1', id: 'address_line_1' },
    { label: 'Address Line 2', id: 'address_line_2' },
    { label: 'City', id: 'city' },
    { label: 'State', id: 'state' },
    { label: 'Zip Code', id: 'zip_code' }
  ];

  return (
    <Form onSubmit={handleSubmit} type="regular">
      <FormWrapper>
        {fields.map(({ label, id, type = 'text' }) => (
          <FormField
            key={id}
            label={label}
            id={id}
            type={type}
            value={formData[id]}
            onChange={handleInputChange}
            disabled={isLoading}
            error={errors[id]}
          />
        ))}
      </FormWrapper>
      <FullWidthField>
        <Button $size="medium" $variation="primary" disabled={isLoading}>
          {!isLoading ? 'Sign Up' : <SpinnerMini />}
        </Button>
      </FullWidthField>
    </Form>
  );
}

function FormField({ label, id, type = 'text', error, ...props }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} $hasError={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

export default SignupForm;
