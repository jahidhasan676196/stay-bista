import PropTypes from 'prop-types';

import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';


const AdminRoutes = ({children}) => {
    const location=useLocation()
    const [role,isLoading]=useRole()
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    if(role==='admin') return children
    return <Navigate to='/login' state={location.pathname}></Navigate>
};
AdminRoutes.propTypes = {
    children: PropTypes.element,
}
export default AdminRoutes;