// components/tab/tab.js
Component({
	properties: {
		/* 目前定义的数据形式，之后需要写方法进行数据转换 */
		list: {
			type: Array,
			value: [
				{ value: 0, name: '' }
			]
		},
		active: {
			type: null,
			value: ''
		},
	},

	data: {
	},

	methods: {
		selectTab(options) {
			const activeValue = options.currentTarget.dataset.value;

			if (activeValue == this.data.active) return

			this.setData({
				active: activeValue
			})

			this.triggerEvent('changeTab', { activeValue });
		}
	}
})
