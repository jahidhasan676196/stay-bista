import { NavLink } from "react-router-dom";


const CustomNavLink = ({ path, elements, icon: Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
        }`
      }
    >
      <Icon className='w-5 h-5' />

      <span className='mx-4 font-medium'>{elements}</span>
    </NavLink>
  );
};

export default CustomNavLink;