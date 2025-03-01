import { Outlet } from "react-router-dom";
import Sidebar from "../components/DashboardComponents/Sidebar";

const DashboardLayout = () => {
    return (
        <div className=" flex ">
            <div className=""><Sidebar></Sidebar></div>
            <div><Outlet></Outlet></div>
        </div>
    );
};

export default DashboardLayout;