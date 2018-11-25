// miniprogram/components/listItem/listItem.js
// let listControl = require('../list/list.js')

Component({
	// behaviors: [listControl],

	// relations:{
	// 	'../list/list.js': {
	// 		type: 'ancestor',
	// 		linkChanged: function (target) {
	// 			console.log(target)
	// 		 }
	// 	},
	// },

  properties: {
		photoId:{
			type:String,
			value:''
		},
		item:{
			type:Object
		}
  },

  
  data: {
		photoUrl:''
  },

	ready: function () {
		const self = this
		setTimeout(function(){
			if (self.data.photoId) {
				self.getPhotoUrl()
			}
		},3000)
	},

  methods: {
		getPhotoUrl:function(){
			let fileList = [];
			fileList.push(this.data.photoId)
			const self = this;
			wx.cloud.getTempFileURL({
				fileList,
				success: res => {
					self.setData({
						photoUrl: res.fileList[0].tempFileURL
					})
				},
				fail: console.error
			})
		}
  }
})
