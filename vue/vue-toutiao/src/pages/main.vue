<template>
    <div>
        <div v-for="item of list">
            <single-pic v-bind="item.data" v-if="item.type === 'singlePic'"></single-pic>
            <multiple-pic v-bind="item.data" v-else-if="item.type === 'multiplePic'"></multiple-pic>
        </div>
    </div>
</template>

<script>
import SinglePic from '../items/single-pic.vue'
import MultiplePic from '../items/multiple-pic.vue'
export default {
    components: {
        SinglePic,
        MultiplePic
    },
    data(){
        return {
            list: []
        }
    },
    
    created(){
        fetch('/list')
            .then(res => res.json())
            .then(({data}) => {
                console.log('data:::', data)
                this.list = data
            })
    },
    methods: {
    }
}
</script>

<style lang="less">

</style>
