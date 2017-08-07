import welcomeComponent from './../components/admin_base/welcome.vue';

// router control
let snavRouter = [
    {
        path: '/',
        redirect: '/index?pos=0'
    },
    {
        path: '/index',
        component: welcomeComponent
    }
];
export {snavRouter}