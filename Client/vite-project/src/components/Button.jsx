const Button = ({
    bgColor = 'bg-blue-700',    // Default color if no prop is passed
    textColor = 'text-white',
    hoverBg = 'hover:bg-blue-800',
    focusColor = 'focus:ring-blue-300',
    rounded = 'rounded-lg',
    text='Login',
    onClick

}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${bgColor} ${textColor} ${hoverBg} ${focusColor} ${rounded}
                        font-medium text-sm px-5 py-2.5 me-2 mb-2 
                        dark:bg-blue-600 dark:hover:bg-blue-700 
                        focus:outline-none dark:focus:ring-blue-800 
                        cursor-pointer `}>
            {text}
            
        </button>
    );
}

export default Button;
