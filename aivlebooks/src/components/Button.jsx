const style =
  'inline-flex items-center justify-center gap-1.5 px-4 py-2 ' +
  'border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium ' +
  'hover:bg-gray-50 active:bg-gray-100 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
  'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors';

function Button({ icon, children, onClick, ...props }) {
  return (
    <button className={style} type="button" onClick={onClick} {...props}>
      {icon && (
        <img src={`/icons/${icon}.svg`} alt="" width="16" height="16" />
      )}
      {children}
    </button>
  );
}

export default Button;