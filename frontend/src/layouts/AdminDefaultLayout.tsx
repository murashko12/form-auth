import { Suspense } from 'react';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDefaultLayout = () => {
    return (
        <>
            <Sidebar />
            <Navbar/>
            <div className="ml-35 mr-10 mt-24">
                <Suspense fallback={<Loader />}>
                <main className="w-full h-[88vh] overflow-auto">
                    <Outlet />
                </main>
                </Suspense>
            </div>
        </>
    )
}

export default AdminDefaultLayout;