import PropTypes from 'prop-types'
import Swal from 'sweetalert2';
import useAxiosCommon from '../../hooks/useAxiosCommon';
const UserDataRow = ({ user, refetch }) => {
    const axiosCommon=useAxiosCommon()
    const handleUpdateUser=async(id)=>{
        console.log(id);
        const { value: role } = await Swal.fire({
            title: "Select field validation",
            input: "select",
            inputOptions: {
                admin:'admin',
                host:'host',
                guest:'guest'
            },
            inputPlaceholder: "Select role",
            showCancelButton: true,
            inputValidator: async(value) => {
                console.log(value);
                if(value){
                    const res=await axiosCommon.patch(`/users/updateRole/${id}`,{value})
                    console.log(res.data.modifiedCount);
                    if(res.data.modifiedCount >0){
                        refetch()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                }
              return value
            }
          });
        //   console.log(role);
    }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=>handleUpdateUser(user?._id)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow