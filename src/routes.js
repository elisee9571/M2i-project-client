import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Layout from './layouts/simple/Layout';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SimpleLayout from './layouts/simple/SimpleLayout';

// pages error
import Page404 from './pages/error/Page404';
import Page401 from './pages/error/Page401';

// pages
import UserListPage from './pages/dashboard/user/UserListPage';
import UserNewPage from './pages/dashboard/user/UserNewPage';

import CategoryListPage from './pages/dashboard/category/CategoryListPage';
import ProductListPage from './pages/dashboard/product/ProductListPage';

import HomePage from './pages/HomePage';
import DashboardAppPage from './pages/DashboardAppPage';

// products
import ProductsPage from './pages/products/ProductsPage';

// auth page
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// middleware
import { CheckAuth, IsAlreadyAuth } from './utils/auth/CheckAuth';


export default function Router() {

    const routes = useRoutes([
        {
            element: <Layout />,
            children: [
                { path: '/', element: <HomePage /> },
                { path: '/products', element: <ProductsPage /> },
            ]
        },
        {
            path: 'dashboard',
            element: <CheckAuth children={<DashboardLayout />} />,
            children: [
                { path: 'app', element: <CheckAuth children={<DashboardAppPage />} /> },
                {
                    path: "user",
                    children: [
                        { path: 'list', element: <CheckAuth children={<UserListPage />} /> },
                        { path: 'new', element: <CheckAuth children={<UserNewPage />} /> },
                    ]
                }, {
                    path: "category",
                    children: [
                        { path: 'list', element: <CheckAuth children={<CategoryListPage />} /> },
                        { path: 'new', element: <CheckAuth children={<CategoryListPage />} /> },
                    ]
                }, {
                    path: "product",
                    children: [
                        { path: 'list', element: <CheckAuth children={<ProductListPage />} /> },
                        { path: 'new', element: <CheckAuth children={<ProductListPage />} /> },
                    ]
                }
            ],
        },
        {
            path: 'login',
            element: <IsAlreadyAuth children={<LoginPage />} />
        },
        {
            path: 'register',
            element: <IsAlreadyAuth children={<RegisterPage />} />
        },
        {
            element: <SimpleLayout />,
            children: [
                { path: '404', element: <Page404 /> },
                { path: '401', element: <Page401 /> },
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