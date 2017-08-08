require("../../html/index.html");
require("../../sass/common/reset.scss"); // import public style

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// use router
Vue.use(VueRouter);
// use resource
Vue.use(VueResource);
// use ElementUI
Vue.use(ElementUI);
// import router config
import {snavRouter} from './../router/router';
// instance of router
const router = new VueRouter({
    routes: snavRouter
});

import snavComponent from './../components/admin_base/snav-component.vue';
import topbarComponent from './../components/admin_base/topbar.vue';
/**
 * @description start App
 * @returns {{name: string}}
 * @constructor
 */
    //App start
let App = new Vue({
    el: '#App',
    data(){
        return {
            'name': 'index'
        }
    },
    components: { // register component
        'topbar-component': topbarComponent,
        'snav-component': snavComponent
,   },
    router: router,
    mounted(){
    },
});