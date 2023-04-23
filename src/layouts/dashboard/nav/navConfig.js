// component
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: icon('ic_analytics'),
    },
    {
        title: 'users',
        path: '/dashboard/user/list',
        icon: icon('ic_user'),
    },
    {
        title: 'login',
        path: '/login',
        icon: icon('ic_lock'),
    },
    {
        title: 'Not found',
        path: '/404',
        icon: icon('ic_disabled'),
    },
];

export default navConfig;