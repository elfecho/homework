/**
 * @file 入口文件
 * @author junhao
*/

import Vue from 'vue';
import Main from './pages/main.vue'
import plugins from './utils';


console.log('plugin:::')

Vue.use(plugins)
// Vue.mixin({
//     methods: utils
// })

const vm = new Vue({
    el: '#app',
    render: h => h(Main)
})





// const vm = new Vue({
//     el: '#app',
//     render: function (createElement) {
//         return createElement('div', {
//         }, [
//             createElement('h1', 'wenzi')
//         ])
//     }
// })