import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useRole from "../../hooks/useRole";
import AdminStatistics from "./AdminStatistics";
import GuestStatistic from "./GuestStatistic";
import HostStatistics from "./HostStatistics";


const Statistics = () => {
    const [role,isLoading]=useRole()
    return (
        <div>
            {isLoading && <LoadingSpinner></LoadingSpinner>}
            {
                role ==='admin' && <AdminStatistics></AdminStatistics>
            }
            {
                role ==='host' && <HostStatistics></HostStatistics>
            }
            {
                role ==='guest' && <GuestStatistic></GuestStatistic>
            }
        </div>
    );
};

export default Statistics;