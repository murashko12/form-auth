import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Loader from "./components/Loader"
import AdminDefaultLayout from "./layouts/AdminDefaultLayout"
import ProtectedRoute from "./components/ProtectedRoute"

const Routers = () => {

    // слой логина
    const LazyLoginPage = lazy(async () => await import('./pages/LoginPage'))

    // слой админа
    const LazyAdminPage = lazy(async () => await import('./pages/AdminPage'))
    const LazyAdminUserPage = lazy(async () => await import('./pages/AdminUserPage'))
    const LazyAdminUserCreatePage = lazy(async () => await import('./pages/AdminUserCreatePage'))
    const LazyAdminUserUpdatePage = lazy(async () => await import('./pages/AdminUserUpdatePage'))

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Слой логина */}
                <Route path="/login" element={<LazyLoginPage />} />
                {/* Слой админа */}
                <Route element={<ProtectedRoute />}> {/* защита маршрутов от неавторизованных пользователей */}
                    <Route element={<AdminDefaultLayout />}>
                        <Route path="/" element={<LazyAdminPage />} />
                        <Route path="/user/:id" element={<LazyAdminUserPage />} />
                        <Route path="/user/create" element={<LazyAdminUserCreatePage />} />
                        <Route path="/user/:id/update" element={<LazyAdminUserUpdatePage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default Routers
