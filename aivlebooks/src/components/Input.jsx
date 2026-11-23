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
<<<<<<< HEAD
=======
        className="ui-input"
>>>>>>> origin/main
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
<<<<<<< HEAD
=======
        className="ui-input"
>>>>>>> origin/main
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