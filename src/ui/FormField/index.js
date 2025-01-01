import FormRowVertical from '../FormRowVertical';
import Input from '../Input';

function FormField({ label, id, type = 'text', error, ...props }) {
  return (
    <FormRowVertical label={label} id={id} {...props}>
      <Input type={type} id={id} aria-invalid={!!error} {...props} />
      {error && <p className="error-text">{error}</p>}
    </FormRowVertical>
  );
}

export default FormField;
