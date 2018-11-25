const db = wx.cloud.database();
const demand = db.collection('demand');
const cityData = [
	{ name: '北京市' },
	{ name: '深圳市' }
]

Page({

	data: {
		demandInfo:{},
		showModal: false,
		currentKey: '',
		inputValue: '',
		cityData,
	},

	onShow: function () {
		const openid = wx.getStorageSync('openid');
		console.log(openid, 'openid')
		if (openid) {
			this.getInfo()
		} else {
			this.login().then(() => {
				self.getInfo()
			});;
		}
	},

	login:function(){
		const promise = new Promise(function (resolve, reject) {
			wx.cloud.callFunction({
				name: 'login',
				data: {},
				success: res => {
					wx.setStorageSync('openid', res.result.openid)
					resolve(res.result.openid)
				},
				fail: err => {
					console.error(err)
				}
			})
		})
		return promise
	},

	getInfo:function(){
		const self = this;
		wx.showLoading({
			title: '正在加载',
		})
		demand.where({
			_openid: wx.getStorageSync('openid')
		})
		.get({
			success: function (res) {
				console.log(res)
				if(res.data[0]){
					self.setData({
						demandInfo: res.data[0]
					})
				}
				wx.hideLoading()
			},
			fail:function(err){
				wx.showModal({
					content: err,
				})
				wx.hideLoading()
			}
		})
	},

	publish: function () {
		wx.showLoading({
			title: '正在发布更新',
			mask: true
		})
		if (!this.data.demandInfo._id) {
			this.add();
		} else {
			this.update()
		}
	},

	add:function(){
		let info = JSON.parse(JSON.stringify(this.data.demandInfo));
		demand.add({
			data: info,
			success: function (res) {
				wx.showModal({
					content: '发布成功',
				})
			},
			complete: function () {
				wx.hideLoading();
			}
		})
	},

	update:function(){
		let info = JSON.parse(JSON.stringify(this.data.demandInfo));
		delete info._id;
		delete info._openid;
		demand.doc(this.data.demandInfo._id).update({
			data: info,
			success: function (res) {
				wx.showModal({
					content: '发布成功',
				})
			},
			fail: function (err) {
				console.log(err)
			},
			complete: function () {
				wx.hideLoading();
			}
		})
	},

	out: function () {
		let info = JSON.parse(JSON.stringify(this.data.demandInfo));
		delete info._id;
		delete info._openid;
		info.style = 'N';
		resume.doc(this.data.demandInfo._id).update({
			data: info,
			success: function (res) {
				wx.showModal({
					content: '下架成功',
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	modifyInfo: function (e) {
		const key = e.currentTarget.dataset.key;
		const inputValue = this.data.demandInfo[key] || '';
		this.setData({
			showModal: true,
			currentKey: key,
			inputValue
		})
	},

	input: function (e) {
		const value = e.detail.value;
		this.setData({
			inputValue: value
		})
	},

	cancleModal: function (e) {
		this.setData({
			showModal: false,
			inputValue: this.data.demandInfo[this.data.currentKey]
		})
	},

	sureModal: function (e) {
		let demandInfo = Object.assign({}, this.data.demandInfo)
		demandInfo[this.data.currentKey] = this.data.inputValue;
		this.setData({
			showModal: false,
			demandInfo
		})
	},


	toogleChooseCity: function () {
		this.setData({
			chooseCity: !this.data.chooseCity
		})
	},

	chooseCity: function (e) {
		const city = e.currentTarget.dataset.value;
		console.log(city)
		let demandInfo = JSON.parse(JSON.stringify(this.data.demandInfo));
		demandInfo.city = city
		this.setData({
			demandInfo
		})
	},
})