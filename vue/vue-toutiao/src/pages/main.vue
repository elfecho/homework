<template>
    <div>
        <div v-for="item of list">
            <single-pic v-bind="item.data" v-if="item.type === 'singlePic'"></single-pic>
            <multiple-pic v-bind="item.data" v-else-if="item.type === 'multiplePic'"></multiple-pic>
            <agriculture v-else></agriculture>
        </div>
    </div>
</template>

<script>
import * as component from '../items'
import SinglePic from '../items/single-pic.vue'
import MultiplePic from '../items/multiple-pic.vue'
import agriculture from '../items/agriculture.vue'
import { setTimeout } from 'timers';
const THREHOLD = 50
const creatThrottle = (delay = 3000) => {
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

export default {
    components: {
        SinglePic,
        MultiplePic,
        agriculture
    },
    data(){
        return {
            list: [],
            throttle: creatThrottle()
        }
    },
    
    created(){
        console.log('components:::', component.MultiplePic)
        fetch('/list?tab=agriculture')
            .then(res => res.json())
            .then(({data}) => {
                console.log('data:::', data)
                this.list = data
            })
        window.onscroll = () => {
            const offsetHeight = document.documentElement.offsetHeight
            const screenHeight = window.screen.height
            const scrollY = window.scrollY;
            const gap = offsetHeight - screenHeight - scrollY;
            if (gap < THREHOLD) {
                this.throttle(() => {
                    console.log('加载')
                })
            }
        }
    },
    methods: {
    }
}
</script>

<style lang="less">

</style>
