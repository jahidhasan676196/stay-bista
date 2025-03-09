import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Addroom from '../pages/Dashboard/Addroom'
import MyListings from '../pages/Dashboard/MyListing'
import UpdateRoomForm from '../pages/Dashboard/UpdateRoomForm'
import UserManagements from '../pages/Dashboard/UserManagements'
import Profile from '../pages/Dashboard/Profile'
import AdminRoutes from './AdminRoutes'
import HostRoutes from './HostRoutes'
import MyBooking from '../pages/Dashboard/MyBooking'
import ManageBookings from '../pages/Dashboard/ManageBookings'
import Statistics from '../pages/Dashboard/Statistics'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // all role be use
      {
        path: 'statistics',
        element: <Statistics></Statistics>
      },
      // guest routes
      {
        path:'my-booking',
        element:<MyBooking></MyBooking>
      },
      {
        path:'manage-booking',
        element:<ManageBookings></ManageBookings>
      },
      // host routes 
      {
        path: 'add-room',
        element: <PrivateRoute><HostRoutes><Addroom></Addroom></HostRoutes></PrivateRoute>
      },
      {
        path: 'my-listings/updateRoom/:id',
        element: <UpdateRoomForm></UpdateRoomForm>
      },
      {
        path: 'my-listings',
        element: <PrivateRoute><HostRoutes> <MyListings></MyListings></HostRoutes></PrivateRoute>
      },
      // admin routes
      {
        path: 'user-management',
        element: <PrivateRoute><AdminRoutes><UserManagements></UserManagements></AdminRoutes></PrivateRoute>
      },
      // all routes use
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
