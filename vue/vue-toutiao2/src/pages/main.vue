<template>
    <div>
        <component
            v-bind:is="page"
            v-bind:tabs="tabs"
            v-bind:curTab.sync="curTab"
            v-on:switchTab="switchTab"
            v-on:more="showMoreTab"
        >
            <!-- <template v-slot:header>
                <div class="navlist">
                    <nav v-for="item of classlist" @click="navhandle(item.type)" :class="isActive(item.type)">
                        {{item.name}}
                    </nav>
                </div>
            </template> -->
            <template v-slot:content="{list}">
                <div v-for="(item, index) of list" :key="index">
                    <component 
                        v-bind:is="item.type | formatComponentName" 
                        v-bind="item.data"
                    >
                    </component>
                </div>
            </template>
        </component>
        
    </div>
</template>

<script>
import * as components from '../components/items'
import Tab from '../components/tab.vue'

import Setting from '../pages/setting.vue';
import {TABS} from '../config';

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
        Setting,
        Agriculture: () => import('../components/items/agriculture.vue')
            .then(res => {
                console.log('resss:', res)
                return res
            })
    },
    data(){
        const constructTabs = tabs => {
            let result = {};
            for (let name in tabs) {
                result[name] = {
                    label: tabs[name],
                    index: 0,
                    list: []
                };
            }
            return result;
        };
        return {
            list: [],
            tabs: constructTabs(TABS),
            curTab: 'agriculture',
            page: 'tab',


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
        // this.getData()    
        this.getListData(this.curTab)
            .then(listData => {
                this.setTabsData(this.curTab, {
                    list: listData
                });
            });
        this.$watch('curTab', newTab => {
            this.switchTab(newTab);
        });    
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
        getListData(tabName) {

            const tab = this.tabs[this.curTab];

            return fetch(
                `/list?tab=${tabName}&index=${tab.index}`
            )
            .then(res => res.json())
            .then(res => res.data);
        },

        setTabsData(tabName, data) {
            this.$set(this.tabs, tabName, {
                ...this.tabs[tabName],
                ...data
            });
        },
        onReachBottom(){
            console.log('加载')
            this.getData()
        },
        navhandle(type){
            this.list = []
            this.type = type
        },
        isActive(typeItem){
            return typeItem === this.type ? 'active': ''
        },


        switchTab(tabName) {
            console.log('tabName', tabName)
            this.curTab = tabName;
            if (!this.tabs[tabName].list.length) {
                this.getListData(tabName)
                    .then(listData => {
                        this.setTabsData(this.curTab, {
                            list: listData
                        });
                    });
            }
        },

        showMoreTab(event) {
            console.log('showMoreTab:', event);
            
            console.log('showMore:::', this.$router);
            if (event === 'hide') {
                console.log('hide::::')
                // this.page = 'tab';
                this.$router.push('/page');
            }
            else {
                // this.page = 'setting'
                this.$router.push('/page/setting');
                // window.location.hash = '#/setting';
            }
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
