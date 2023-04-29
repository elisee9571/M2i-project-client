import {
    Assessment as AssessmentIcon,
    AccountBox as AccountBoxIcon,
    LocalOffer as LocalOfferIcon,
    LocalMall as LocalMallIcon,
    RateReview as RateReviewIcon,
    Receipt as ReceiptIcon,
    Payment as PaymentIcon
} from '@mui/icons-material';

const navConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: <AssessmentIcon />,
    },
    {
        title: 'utilisateur',
        path: '/dashboard/user/list',
        icon: <AccountBoxIcon />,
    },
    {
        title: 'catégorie',
        path: '/dashboard/category/list',
        icon: <LocalOfferIcon />,
    },
    {
        title: 'produit',
        path: '/dashboard/product/list',
        icon: <LocalMallIcon />,
    },
    {
        title: 'note',
        path: '/dashboard/rate/list',
        icon: <RateReviewIcon />,
    },
    {
        title: 'commande',
        path: '/dashboard/order/list',
        icon: <ReceiptIcon />,
    },
    {
        title: 'paiement',
        path: '/dashboard/payment/list',
        icon: <PaymentIcon />,
    }
];

export default navConfig;