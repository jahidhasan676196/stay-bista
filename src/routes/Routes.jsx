import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import HostStatistics from '../pages/Dashboard/HostStatistics'
import Addroom from '../pages/Dashboard/Addroom'
import MyListings from '../pages/Dashboard/MyListing'
import UpdateRoomForm from '../pages/Dashboard/UpdateRoomForm'

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
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'statistics',
        element:<HostStatistics></HostStatistics>
      },
      {
        path:'add-room',
        element:<Addroom></Addroom>
      },
      {
        path:'my-listings/updateRoom/:id',
        element:<UpdateRoomForm></UpdateRoomForm>
      },
      {
        path:'my-listings',
        element:<MyListings></MyListings>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
