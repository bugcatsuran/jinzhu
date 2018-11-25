Page({
	data: {
		rankList:[],
		typeValue: 1,
	},

	onShow: function () {
		wx.showLoading({
			title: '正在加载',
		})
		this.getRankList()
		.then(() => {
			wx.hideLoading()
		}, err => {
			wx.hideLoading()
			wx.showModal({
				content: err,
			})
		})
	},

	getRankList: function () {
		const self = this;
		const promise = new Promise(function (resolve, reject) {
			wx.cloud.callFunction({
				name: 'rankList',
				data: {
					type: self.data.typeValue
				},
				success: res => {
					console.log(res.result, 'ranklist')
					self.setData({
						rankList: res.result
					})
					resolve()
				},
				fail: err => {
					reject('网络开小差了~')
				},
				complete: () => {
				}
			})
		})
		return promise
	},

	toDetail: function (e) {
		console.log(e)
		const id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '../detailResume/detailResume?id=' + id,
		})
	},

	onPullDownRefresh: function () {
		
	},

	onReachBottom: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})