<template>
    <div>
        <div class="item multiple-image">
            <h3>
                查猪价
            </h3>
            <div>
                <label>输入地区：</label> 
                <input type="text" v-on:input="oninput">
                <span>地区：{{area}}</span>
            </div>
            <div>
                猪价：{{price | addCount}}
            </div>
        </div>
    </div>
</template>

<script>
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
    data(){
        return {
            area: '北京',
            price: 0,
            debounce: createDebouce(3000)
        }
    },
    created() {
        // this.$watch('area', area => {
        //     this.queryPigPrice(area)
        // })
    },
    watch: {
        area(newArea, area){
            this.queryPigPrice(newArea)
        }
    },
    filters: {
        addCount(price){
            return price + '$'
        }
    },
    methods: {
        oninput(e){
            const debounce = this.debounce
            console.log('debounce:::', debounce)
            this.debounce(()=>{
                this.area = e.data
            })
            
        },
        queryPigPrice(area){
            fetch('/price?area=' + area)
                .then(res => res.json())
                .then(priceRes => {
                    this.price = priceRes.infos[0].price
                })
        }
    }
}
</script>
