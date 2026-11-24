const style = `border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 
focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`

function SelectButton({ 
  options = [], 
  value, 
  onChange,
  ...props
}) 
{
  return (
    <div>
      <select
        className = {style} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectButton;