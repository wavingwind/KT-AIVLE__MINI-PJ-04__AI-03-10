function SelectButton({ 
  options = [], 
  value, 
  onChange 
}) 
{
  return (
    <div>
      <select 
      className="ui-select"
      value={value} 
      onChange={(e) => onChange(e.target.value)}>
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