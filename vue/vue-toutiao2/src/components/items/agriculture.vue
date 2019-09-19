<template>
    <div>
        <div class="item multiple-image">
            
            <h3>
                查猪价
            </h3>
            <echarts></echarts>
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
export default {
    data(){
        return {
            area: '北京',
            price: 0,
            debounce: this.createDebouce(3000)
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
