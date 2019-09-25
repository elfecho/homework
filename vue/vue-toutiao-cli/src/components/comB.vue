<template>
  <div class="about">
    我是comB的{{demo}}
    <comC></comC>
  </div>
</template>
<script type="text/javascript">
import comC from '../components/comC.vue'
export default {
	name: 'A',
	inject: ['for'],
	data() {
		return {
			demo: this.for
		}
	},
	components: {
		comC
	}
}
</script>