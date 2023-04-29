import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SimpleLayout from './layouts/simple/SimpleLayout';

// page
import UserListPage from './pages/dashboard/user/UserListPage';
import UserNewPage from './pages/dashboard/user/UserNewPage';

import CategoryListPage from './pages/dashboard/category/CategoryListPage';

import ProductListPage from './pages/dashboard/product/ProductListPage';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';


export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <DashboardAppPage /> },
                {
                    path: "user",
                    children: [
                        { path: 'list', element: <UserListPage /> },
                        { path: 'new', element: <UserNewPage /> },
                    ]
                }, {
                    path: "category",
                    children: [
                        { path: 'list', element: <CategoryListPage /> },
                        { path: 'new', element: <CategoryListPage /> },
                    ]
                }, {
                    path: "product",
                    children: [
                        { path: 'list', element: <ProductListPage /> },
                        { path: 'new', element: <ProductListPage /> },
                    ]
                }

            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}