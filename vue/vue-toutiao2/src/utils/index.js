/**
 * @file 所有的工具函数集合
 * @author junhao
*/
import echarts from 'echarts';
const THREHOLD = 150

const createThrottle = (delay = 1000) => {
    let status = 'START'
    return function throttle (fn) {
        if (status === 'WAITING') {
            return;
        }
        status = 'WAITING'
        setTimeout(() => {
            fn && fn()
            status = 'START'
        }, delay)
    }
}


// debounce - 去抖
const createDebouce = (delay = 1000) => {
    let timer = null
    return function debounce(fn){
        // 打断
        clearTimeout(timer)
        // 重新计时
        timer = setTimeout(()=>{
            fn && fn()
        }, delay)
    }
}

export default {
    install: Vue =>{
        Vue.mixin({
            created(){
                if (typeof this.onReachBottom === 'function') {
                    const throttle = createThrottle(300)
                    window.addEventListener('scroll', () => {
                        const offsetHeight = document.documentElement.offsetHeight
                        const screenHeight = window.screen.height
                        const scrollY = window.scrollY;
                        const gap = offsetHeight - screenHeight - scrollY;
                        if (gap < THREHOLD) {
                            throttle(() => {
                                this.onReachBottom && this.onReachBottom()
                            })
                        }
                    })
                }
            },

            methods: {
                createDebouce
            }
        })
        Vue.component('echarts', {
            render(createElement) {
                return createElement(
                    'div',
                    {
                        attrs: {
                            id: this.randomId                            
                        },
                        style: {
                            width: '100%',
                            height: '200px'
                        },
                        directives: [
                            {
                                name: 'echarts'
                            }
                        ]
                    }
                )
            },
            mounted(){
                console.log('echartsHandler:::', this.echartsHandler)
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.echartsHandler.setOption(option);
            },
            computed: {
                randomId(){
                    return 'echarts-' +  Math.floor( Math.random() * 10)
                }
            },
            methods:{
                revieverEchartHandler(handler) {
                    this.echartsHandler = handler
                }
            }
        })
        Vue.directive('echarts', {
            inserted(el, binding, vnode) {
                const echartsHandler = echarts.init(el)
                vnode.context.revieverEchartHandler && vnode.context.revieverEchartHandler(echartsHandler)
            }
        })
    }
}