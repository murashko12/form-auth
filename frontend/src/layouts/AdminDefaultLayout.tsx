import { Outlet } from 'react-router-dom';

const AdminDefaultLayout = () => {
    return (
        <div className="text-white">
            AdminDefaultLayout
            <Outlet />
        </div>
    )
}

export default AdminDefaultLayout;