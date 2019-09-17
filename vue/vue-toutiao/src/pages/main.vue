<template>
    <div>
        <tab :classlist="classlist">
            <template v-slot:header>
                <div class="navlist">
                    <nav v-for="item of classlist" @click="navhandle(item.type)" :class="isActive(item.type)">
                        {{item.name}}
                    </nav>
                </div>
            </template>
            <template v-slot:content>
                <div v-for="(item, index) of list" :key="index">
                    <component 
                        v-bind:is="item.type | formatComponentName" 
                        v-bind="item.data"
                    >
                    </component>
                </div>
            </template>
        </tab>
        
    </div>
</template>

<script>
import * as components from '../items'
import Tab from '../components/tab.vue'


const converModuleObj = moduleObj => {
    let result = {};
    for(let moduleName in moduleObj) {
        result[moduleName] = moduleObj[moduleName]
    }
    return result;
}

export default {
    components: {
        ...converModuleObj(components),
        Tab,
        Agriculture: () => import('../items/agriculture.vue')
            .then(res => {
                console.log('resss:', res)
                return res
            })
    },
    data(){
        return {
            list: [],
            classlist: [{
                id: 0,
                type: '_all__',
                name: '推荐'
            }, {
                id: 1,
                type: 'new_hot',
                name: '热点'
            }, {
                id: 2,
                type: 'agriculture',
                name: '农业'
            },],
            number: 0,
            type: '_all__'
        }
    },
    filters: {
        formatComponentName(componentName){
            return componentName.replace(/^\w/g, name => name.toUpperCase())
        }
    },
    created(){
        this.getData()        
    },
    watch: {
        type(){
            this.getData()
        }
    },
    methods: {
        getData(){
            fetch('/list?tab=' + this.type)
                .then(res => res.json())
                .then(({data}) => {
                    this.list = this.list.concat(data)
                })
        },
        onReachBottom(){
            console.log('加载')
            this.getData()
        },
        navhandle(type){
            this.type = type
        },
        isActive(typeItem){
            return typeItem === this.type ? 'active': ''
        }
    }
}
</script>

<style>
.navlist {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #808080;
}
.navlist nav {
    margin-left: 28px;
}
.navlist nav.active {
    color: red;
}
</style>
