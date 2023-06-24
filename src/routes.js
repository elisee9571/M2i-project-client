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
import ProductPage from './pages/products/ProductPage';
import ProductAddPage from './pages/products/ProductAddPage';

// favorites
import FavoritesPage from './pages/favorites/FavoritesPage';

// offers
import OffersPage from './pages/offers/OffersPage';

// users
import ProfilePage from './pages/users/ProfilePage';
import ProfileSettingsPage from './pages/users/ProfileSettingsPage';
import UsersPage from './pages/users/UsersPage';

// auth page
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// password
import ForgotPasswordPage from './pages/password/ForgotPasswordPage';
import ResetPasswordPage from './pages/password/ResetPasswordPage';

// payment
import PaymentPage from './pages/payment/PaymentPage';

// orders
import OrdersPage from './pages/orders/OrdersPage';

// middleware
import { CheckAuth, IsAlreadyAuth } from './utils/auth/CheckAuth';
import { useContext } from 'react';
import { UserContext } from './utils/UserContext';

export default function Router() {
    const { user } = useContext(UserContext);

    const routes = useRoutes([
        {
            element: <Layout user={user} />,
            children: [
                { path: '/', element: <HomePage user={user} /> },
                {
                    path: "users",
                    children: [
                        { path: 'search', element: <UsersPage user={user} /> },
                    ]
                },
                {
                    path: "profile",
                    children: [
                        { path: ':pseudo', element: <ProfilePage user={user} /> },
                        { path: 'settings', element: <ProfileSettingsPage user={user} /> },
                    ]
                },
                {
                    path: "products",
                    children: [
                        { path: ':id', element: <ProductPage user={user} /> },
                        { path: 'add', element: <ProductAddPage user={user} /> },
                        { path: 'search', element: <ProductsPage user={user} /> },
                    ]
                },
                { path: 'favorites', element: <FavoritesPage user={user} /> },
                { path: 'payment', element: <PaymentPage user={user} /> },
                { path: 'orders', element: <OrdersPage user={user} /> },
                {
                    path: "offers",
                    children: [
                        { path: 'propose', element: <OffersPage user={user} /> },
                    ]
                }
            ]
        },
        { path: 'login', element: <IsAlreadyAuth children={<LoginPage />} /> },
        { path: 'register', element: <IsAlreadyAuth children={<RegisterPage />} /> },
        { path: 'forgot-password', element: <IsAlreadyAuth children={<ForgotPasswordPage />} /> },
        { path: 'reset-password', element: <IsAlreadyAuth children={<ResetPasswordPage />} /> },
        {
            element: <SimpleLayout />,
            children: [
                { path: '404', element: <Page404 /> },
                { path: '401', element: <Page401 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: 'dashboard',
            element: <CheckAuth children={<DashboardLayout />} />,
            children: [
                { path: '', element: <CheckAuth children={<DashboardAppPage user={user} />} /> },
                {
                    path: "user",
                    children: [
                        { path: 'list', element: <CheckAuth children={<UserListPage user={user} />} /> },
                        { path: 'new', element: <CheckAuth children={<UserNewPage user={user} />} /> },
                    ]
                }, {
                    path: "category",
                    children: [
                        { path: 'list', element: <CheckAuth children={<CategoryListPage user={user} />} /> },
                        { path: 'new', element: <CheckAuth children={<CategoryListPage user={user} />} /> },
                    ]
                }, {
                    path: "product",
                    children: [
                        { path: 'list', element: <CheckAuth children={<ProductListPage user={user} />} /> },
                        { path: 'new', element: <CheckAuth children={<ProductListPage user={user} />} /> },
                    ]
                }
            ],
        },
    ]);

    return routes;
}