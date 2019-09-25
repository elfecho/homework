<template>
  <div class="about">
    <h1>This is an about page</h1>
    <comB></comB>
  </div>
</template>
<script type="text/javascript">
import comB from '../components/comB.vue'
export default {
	name: 'A',
	provide: {
		for: 'demo'
	},
	components: {
		comB
	}
}
</script>