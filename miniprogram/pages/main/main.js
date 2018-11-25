const classifyList = [
	{ value: 1, name: '家教排行' },
	{ value: 2, name: '需求排行' }
]

Page({
	data: {
		classifyList,
		rankList: [],
		typeValue:1,
		showCities:false,
		searchData:{}
	},

	onLoad: function (options) {
		wx.showLoading({
			title: '正在加载',
		})
		this.getLocation().then(()=>{
			this.getRankList()
				.then(() => {
					wx.hideLoading()
				}, err => {
					wx.hideLoading()
					wx.showModal({
						content: err,
					})
				})
		})
	},

	search:function(){

	},
	
	getLocation:function(){
		const self = this;
		const promise = new Promise(function(resolve,reject){
			wx.getLocation({
				type: 'wgs84',
				success: function (res) {
					const latitude = res.latitude
					const longitude = res.longitude
					wx.request({
						url: 'https://api.map.baidu.com/geocoder/v2/?ak=6N8xmNwkMoK8EubKOK7Y9WpllWHwAxvx&location='
							+ latitude + ',' + longitude + '&output=json',
						data: {},
						header: { 'Content-Type': 'application/json' },
						success: function (res) {
							self.setData({
								city: res.data.result.addressComponent.city
							})
						},
						complete(){
							resolve()
						}
					})
				},
				complete(){
				}
			})
		})
		return promise
	},

	getRankList: function () {
		let searchData = this.data.searchData;
		if(this.data.city){
			// searchData.city = this.data.city
		}
		const self = this;
		const promise = new Promise(function (resolve, reject) {
			wx.cloud.callFunction({
				name: 'rankList',
				data: {
					type: self.data.typeValue,
					searchData,
				},
				success: res => {
					console.log(res.result,'ranklist')
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

	changeTab: function (e) {
		const typeValue = e.detail.activeValue;
		this.setData({
			typeValue
		}, () => {
			wx.showLoading({
				title: '正在加载',
			})
			this.getRankList().then(() => {
				wx.hideLoading()
			})
		})
	},

	toDetail: function (e) {
		console.log(e.detail.current)
		wx.navigateTo({
			url: '../detailResume/detailResume?id=' + e.detail.current,
		})
	},

	showCities:function(){
		this.setData({
			showCities: !this.data.showCities
		})
	},

	changeCity:function(e){
		this.showCities();
		this.setData({
			city:e.detail.city,	
		},()=>{
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
		})
	},

	onPullDownRefresh: function () {
		this.getRankList().then(() => {
			wx.stopPullDownRefresh()
		}, err => {
			wx.stopPullDownRefresh();
			wx.showModal({
				content: '网络开小差了',
			})
		});
	}
})