

import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const HostRoutes = ({ children }) => {
    const location=useLocation()
   
    const [role,isLoading] = useRole()
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if ( role === 'host') return children
    return <Navigate to='/login' state={location.pathname} replace='true' />
};
HostRoutes.propTypes = {
    children: PropTypes.element,
}

export default HostRoutes;