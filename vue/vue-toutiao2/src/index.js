/**
 * @file 入口文件
 * @author junhao
*/

import Vue from 'vue';
// import VueRouter from 'vue-router'
import VueRouter from './vue-fake-router';


import Main from './pages/main.vue'
import Setting from './pages/setting.vue'
import Detail from './pages/detail.vue'
import Video from './components/detail-contents/video.vue'
import Text from './components/detail-contents/text.vue'



import plugins from './utils';


Vue.use(VueRouter)

Vue.use(plugins)


const routes = [
    {
        path: '/page',
        component: Main
    },
    {
        path: '/page/setting',
        component: Setting
    },
    {
        path: '/page/detail/:id',
        component: Detail,
        props: true,
        children: [
            {
                path: 'video',
                component: Video
            },
            {
                path: 'text',
                component: Text
            }
        ]
    }
];

const router = new VueRouter({
    routes
})
const vm = new Vue({
    el: '#app',
    router,
    render(createElement) {
        return createElement('router-view');
    }
})



// render: h => h(Main)


// const vm = new Vue({
//     el: '#app',
//     render: function (createElement) {
//         return createElement('div', {
//         }, [
//             createElement('h1', 'wenzi')
//         ])
//     }
// })