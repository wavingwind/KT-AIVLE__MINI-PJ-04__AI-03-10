function Button({ icon = '❇️', children, onClick }) {
  return (
    <button className="ui-button" type="button" onClick={onClick}>
      {icon} {children}
    </button>
  );
}

export default Button;
