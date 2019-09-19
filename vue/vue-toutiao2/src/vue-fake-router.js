/**
 * @file router
 * @author junhao
*/

export default class VueRouter {
    constructor(options){
        this.routes = options.routes
        this.history = new History()
        this.history.listen(newHash => {
            console.log('vm:', this.vm);
            console.log('newHash:', newHash);
            this.vm.$forceUpdate();
            
        })
    }

    push(path) {
        this.history.push(path)
    }

    static install(Vue, options) {
        Vue.mixin({
            created(){
                // 自查
                if (this.$options.router) {
                    // 把自己挂到router上，方便调用
                    this.$options.router.vm = this
                    this.$router = this.$options.router
                }
                else {
                    this.$router = this.$parent.$router
                }
                
            }
        })

        Vue.component('router-view', {
            // 强行不使用props
            functional: true,

            render(createElement, {props, children, parent}){
                const router = parent.$router
                const currentHash = location.hash
                console.log('currentHash', currentHash)
                const currentRoute = matcher(currentHash, router.routes)

                // router.history.listen(newHash => {
                //     console.log('newHash:', newHash)
                // })
                console.log('$parent:', currentRoute)
                // 拿到当前路径下应该对应的component
                return createElement(
                    currentRoute.component
                )
            }
        })

        Vue.component('router-link', {
            render(createElement) {
                return createElement('span', {
                    on: {
                        click: this.clicking
                    }
                }, this.$slots.default)
            },
            methods: {
                clicking(){
                    console.log(1111)
                    window.history.back()
                }
            }
        })
    }
}
const matcher = (path, routesConfig) => {
    return routesConfig
        .find(route => {
            return route.path === path.replace(/^#/, '')
        })
}

class History {
    listen(callback){
        window.addEventListener('hashchange', () => {
            callback && callback(window.location.hash)
        })
    }
    push(path) {
        window.location.hash = '#' + path
    }
}