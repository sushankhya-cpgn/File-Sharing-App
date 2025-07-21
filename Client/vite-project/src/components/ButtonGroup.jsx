const ButtonGroup = ({ items, togglelogin }) => {
    return (
      <div className="inline-flex rounded-md shadow-xs" role="group">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 
              hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 
              dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700
              ${index === 0 ? 'rounded-l-lg' : index === items.length - 1 ? 'rounded-r-lg' : ''}`}
            onClick={() => togglelogin(item === "login")}
          >
            {item}
          </button>
        ))}
      </div>
    );
  };
  
  export default ButtonGroup;
  