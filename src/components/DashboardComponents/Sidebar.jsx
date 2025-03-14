import { useState } from 'react'
import { GrLogout, GrUserManager } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { AiOutlineBars } from 'react-icons/ai'
import { MdHomeWork, MdLibraryBooks } from "react-icons/md";
import { BsGraphUp } from 'react-icons/bs'

import { FaUsers } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import CustomNavLink from './CustomNavLink'
import useRole from '../../hooks/useRole'
import ToggleBtn from './ToggleBtn'
import Swal from 'sweetalert2'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAxiosCommon from '../../hooks/useAxiosCommon'
import { SiGoogletagmanager } from 'react-icons/si'
const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role] = useRole()
  const navigate = useNavigate()
  const { user } = useAuth()
  // const axiosSecure = useAxiosSecure()
  const axiosCommon = useAxiosCommon()


  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  const handleLogOut = () => {
    logOut()
    navigate('/login')

  }
  const handleHostRequest = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be a Host",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const info = { status: 'requested' }
        const res = await axiosCommon.patch(`/user/updateRole/${user?.email}`, info)
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your Content Update Successfull",
            icon: "success"
          });
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Wait admin aproved!!",
            text: "Your request pending"
          });
        }

      }
    });
    console.log('i am click');
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`min-h-screen flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4  inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/4ZXzmq5/logo.png'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {role === 'host' && <ToggleBtn></ToggleBtn>}
              {/* Statistics */}
              <CustomNavLink path='/dashboard/statistics' elements='Statistics' icon={BsGraphUp}></CustomNavLink>
              {role==='guest' && <div>
                <CustomNavLink path='my-booking' elements='My Booking' icon={MdLibraryBooks }></CustomNavLink>
                </div>}
              {role === 'host' && <div>
                {/* Add Room */}
                <CustomNavLink path='add-room' elements='Add Room' icon={BsFillHouseAddFill}></CustomNavLink>
                {/* My Listing */}
                <CustomNavLink path='my-listings' elements='My Listings' icon={MdHomeWork}></CustomNavLink>
                <CustomNavLink path='manage-booking' elements='Manage Booking' icon={SiGoogletagmanager}></CustomNavLink>
              </div>}
              {role === 'admin' && <div>
                <CustomNavLink path='/dashboard/user-management' elements='User Managements' icon={FaUsers}></CustomNavLink>
              </div>}
              {
                role === 'guest' && <div className='flex items-center gap-2 ml-4'>
                  <GrUserManager className='w-5 h-5' />
                  <button onClick={handleHostRequest} className='btn text-gray-700 font-medium  text-base'>Become a Host</button></div>
              }

            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <CustomNavLink path='/dashboard/profile' elements='Profile' icon={FcSettings}></CustomNavLink>
          {/* <NavLink
            to=''
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'></span>
          </NavLink> */}
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar