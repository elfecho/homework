<template>
    <div class="item multiple-image" v-on:click="skip">
        <h3>
            {{title}}
        </h3>
        <div class="image-list">
            <img v-for="imagePath of imageList" :src="imagePath" />
        </div>
    </div>
</template>

<script>
import BasetOptions from './base.js'
/**
 * @file feed流多图item
 * @author junhao
*/
export default {
    extends: BasetOptions
}
</script>
<style scoped>
@import './index.css';
.multiple-image h3 {
    font-size: 17px;
}

.multiple-image .image-list img {
    width: 33%;
}
</style>
