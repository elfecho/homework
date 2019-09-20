<template>
	<div class="l">
		<div 
			v-for="item in convertedTabs"
			v-bind:key="item.unit"
			class="item"
		>
			{{item.title}}
		</div>
	</div>
</template>
<script>
/*eslint disable*/
import {convert} from '../utils';
export default {
	props: ['tabs'],
	computed: {
		convertedTabs() {
			return convert(this.tabs)
		}
	}
}
</script>