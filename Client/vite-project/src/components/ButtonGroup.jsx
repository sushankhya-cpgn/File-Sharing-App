
const ButtonGroup = ({ items, togglelogin,login }) => {
    console.log(login)
    return (
      <div className="inline-flex rounded-md shadow-xs" role="group">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 
              hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 
              ${login && item === "login" ? 'bg-black text-white' : ''}
              ${index === 0 ? 'rounded-l-lg' : index === items.length - 1 ? 'rounded-r-lg' : ''} `}
            onClick={() => togglelogin(item === "login")}
          >
            {item}
          </button>
        ))}
      </div>
    );
  };


export default ButtonGroup;


