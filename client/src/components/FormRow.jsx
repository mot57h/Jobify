// components/FormRow.jsx

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = '',
  ...rest // This collects things like "required", "placeholder", etc.
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue}
        {...rest} // ⬅️ This line is critical!
      />
    </div>
  );
};

export default FormRow;
