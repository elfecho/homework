<template>
  <div class="about">
    我是comC的{{demo}}
  </div>
</template>
<script type="text/javascript">
export default {
	name: 'A',
	inject: ['for'],
	data() {
		return {
			demo: this.for
		}
	}
}
</script>