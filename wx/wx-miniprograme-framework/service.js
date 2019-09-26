/**
 * @fileOverview  小程序核心逻辑层
 * @author junhao
 */

(function (global) {
	const wx = {}
	let classMap = {}
	class Logic {
		init() {
			const firstPageUri = window.appJSON.pages[0]
			this.navigateTo(firstPageUri)
			this.uniqIndex = 0
		}
		_generateUniqId() {
			return 'id' + this.uniqIndex++
		}
		navigateTo(uri) {
			const PageClass = classMap[uri]
			console.log(uri, classMap)
			const page = new PageClass(this._generateUniqId(), uri)
		}
	}

	class PageBase {
		constructor(id, uri) {
			this.uri = uri
			this.id = id
			this._initData()
			this._render()
		}
		_initData() {
			this.data = JSON.parse(JSON.stringify(this.data || {}))
		}
		_render() {
			global.__bridge.createView(this.id)
				.then(frame => {
					this.$el = frame
				})
		}
		setData() {

		}
	}

	const createPageClass = options => {
		class Page extends PageBase {
			constructor(...args) {
				super(...args)
			}
		}
		Object.assign(Page.prototype, options)
		return Page
	}

	const Page = (uri, options) => {
		classMap[uri] = createPageClass(options)
	}
	global.logic = new Logic()
	global.Page = Page
})(window)