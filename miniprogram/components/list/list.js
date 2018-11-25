// miniprogram/components/list/list.js

module.exports = Behavior({
})

Component({

	externalClasses: ['goods_shell'],

	// relations: {
	// 	'../listItem/listItem.js': {
	// 		type: 'child', 
	// 	}
	// },

	properties: {
		list: {
			type: Array,
			value: [],
		}
	},

	data: {

	},

	pageLifetimes: {
		show: function () {
		},
	},

	methods: {
		goDetail(e) {
			const current = e.currentTarget.dataset.current;
			this.triggerEvent('goDetail', { current });
		}
	}
})