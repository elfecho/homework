import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Tab from '@/components/tab.vue'

describe('检测tab.vue', () => {
  it('检测tab.vue是否被正常渲染', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Tab, {
      propsData: { 
      	tabs: [
	      	{
	      		title: 'tab11111'
	      	},
	      	{
	      		title: 'tab22222221'
	      	}
      	]
      }
    })
    console.log('过过过')
    // expect(wrapper.text()).to.include(msg)
    expect(wrapper.contains('.item')).to.equal(true);
  })
})
