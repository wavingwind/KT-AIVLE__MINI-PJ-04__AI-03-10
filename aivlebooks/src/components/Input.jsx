const style =
  'w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm ' +
  'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
  'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed';

function Input({
    id,
    as = 'input',  //여러 줄 받고 싶을때 요소값으로 'textarea'넣자
    title = '', 
    ...props
}) {
const element = as === 'textarea' ? 'textarea' : 'input';
const Element = element;

return (
    <>
        {title && <label htmlFor={id}>{title}</label>}
        <Element
            className="ui-input"
            {...props}
        />
    </>
    );
}

export default Input;