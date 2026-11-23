function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  multiline = false,
  disabled = false,
}) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}

      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </>
  );
}

export default Input;