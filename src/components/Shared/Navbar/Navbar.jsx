import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import avatarImg from '../../../assets/images/placeholder.jpg'
import useAuth from '../../../hooks/useAuth'

import Swal from 'sweetalert2'
import useRole from '../../../hooks/useRole'
import useAxiosSecure from '../../../hooks/useAxiosSecure'


const Navbar = () => {
  const { user,setUser ,logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [role]=useRole()
  const axiosSecure=useAxiosSecure()
  
const handleLogOut=()=>{
  logOut()
  .then(()=>{
    console.log('signUp sucessfull');
    setUser(null)
    // console.log(result);
  })
  .catch((err)=>{
    console.log(err);
  })
  

}
const handleHost=async()=>{
  const info={
    status:'requested'
  }
  const res=await axiosSecure.patch(`/user/${user?.email}`,info)
  console.log(res.data.modifiedCount >0);
  if(res.data.modifiedCount > 0){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your request is pending",
      showConfirmButton: false,
      timer: 1500
    });
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Please wait admin aproved",
      text: "Something went wrong!"
    });
  }
}

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Become A Host btn */}
                <div className='hidden md:block'>
                  {(user && role==='guest')  && (
                    <button
                    onClick={handleHost}
                      disabled={!user}
                      className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                    >
                      Host your home
                    </button>
                  )}
                </div>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                      
                        <Link
                        to="/dashboard/statistics"
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
