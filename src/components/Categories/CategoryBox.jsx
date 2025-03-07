import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate=useNavigate()
  /* eslint-disable no-console */
  const [params,setParams]=useSearchParams()
  const category=params.get('category')
  console.log(category===label);
  const handleSetQuery = (label) => {
    const qs={category:label}
    const parsed = queryString.stringifyUrl({
      url:'/',
      query:qs
    });
    navigate(parsed)
    // console.log(parsed);
    // console.log(label);
  }
  return (
    <div
      onClick={() => handleSetQuery(label)}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${category===label && 'border-b-neutral-800 text-neutral-800'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
