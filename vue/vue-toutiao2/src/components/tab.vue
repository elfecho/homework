<template>
    <div>
        <!-- <div>
            <slot name="header"></slot>
        </div> -->
        <!-- <div>
            <slot name="content"></slot>
        </div> -->
        <nav-head
            v-on:select="$emit('update:curTab', $event)"
            v-on:more="getMoreEvent"
            v-bind:tabs="tabs"
        >
        </nav-head>
        <div class="tab-list">
            <template v-for="(tab, name) in tabs" >
                <!-- ddddd:::{{name === curTab}}
                =-----
                {{tab.list}} -->
                <transition name="fade">
                    
                    <div v-show="name === curTab">
                        <slot name="content" v-bind:list="tab.list"></slot>
                    </div>
                </transition>
            </template>
        </div>

    </div>
</template>

<script>
/**
 * @flie tab容器
 * @author junhao
*/
import Head from './head.vue';
export default {
    components: {
        'nav-head': Head
    },
    props: ['tabs', 'curTab'],
    mounted(){
        console.log('tabstabstabs::::' ,this.tabs)
    },
    methods: {
        getMoreEvent(event) {
            console.log('getMoreEvent', 5555555)
            this.$emit('more', event);
        }
    }
}
</script>
<style scoped>
nav {
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

