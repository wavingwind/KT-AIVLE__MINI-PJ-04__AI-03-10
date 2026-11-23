function Input({
    id,
    as = 'input',  //여러 줄 받고 싶을때 요소값으로 'textarea'넣자
    title = '', 
    ...props
}) {
const element = as === 'textarea' ? 'textarea' : 'input';
const Element = element;

const baseStyle =
    'w-full px-3 py-2 border border-gray-300 rounded-md text-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
    'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed';

return (
    <>
        {title && <label htmlFor={id}>{title}</label>}
        <Element
            className={baseStyle}
            {...props}
        />
    </>
    );
}

export default Input;