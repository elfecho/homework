/**
 * @fileOverview  小程序核心逻辑层
 * @author junhao
 */

class Bridge {
	createView(id) {
		return new Promise(resolve => {
			let frame = document.createElement('iframe')
			frame.src = './view.html'
			frame.id = id
			frame.className = 'view'
			frame.onload = () => resolve(frame)
			document.body.appendChild(frame)
		})
		
	}
}

window.__bridge = new Bridge()