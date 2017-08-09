import welcomeComponent from './../components/admin_base/welcome.vue';
// import cashList from './../components/sale/cash/cashList.vue';
// import invoiceList from './../components/sale/invoice/invoiceList.vue';

// Import based on page loading need
const cashList = () => import(/*webpackChunkName: "cashList"*/'./../components/sale/cash/cashList.vue');
const invoiceList = () => import(/*webpackChunkName: "invoiceList"*/'./../components/sale/invoice/invoiceList.vue');
// router control
let snavRouter = [
    {
        path: '/',
        redirect: '/index?pos=0'
    },
    {
        path: '/index',
        component: welcomeComponent
    },
    {
        path: '/cash/cashList',
        component: cashList
    },
    {
        path: '/invoice/invoiceWriteList',
        component: invoiceList
    }
];
export {snavRouter}