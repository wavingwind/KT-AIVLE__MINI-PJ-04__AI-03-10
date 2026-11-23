function Button({ icon = '❇️', children, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {icon} {children}
    </button>
  );
}

export default Button;
