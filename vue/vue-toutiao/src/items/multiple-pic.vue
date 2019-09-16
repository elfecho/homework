<template>
    <div>
        <div class="item multiple-image" on:click="aa">
            <h3>
                {{title}}
            </h3>
            <div class="image-list">
                <img v-for="imagePath of imageList" :src="imagePath" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'imageList']
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
