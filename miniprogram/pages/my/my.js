const roleDefine = {
	0:'请选择',
	1:'请登录',
	2:'家教',
	3:'家长',
}

Page({
	data: {
		authUserInfo:true,
		userInfo:{},
		showModal: false,
		role:null,
		roleDefine,
	},

	onLoad: function (options) {
		const self = this;
		wx.getSetting({
			success(res){
				console.log(res)
				if (!res.authSetting['scope.userInfo']){
					self.setData({
						authUserInfo:false,
						role:1
					})
				}else{
					if (wx.getStorageSync('authUserInfo')){
						self.setData({
							userInfo: wx.getStorageSync('userInfo'),
							role: wx.getStorageSync('role') || 0
						})
					}else{
						self.setData({
							authUserInfo: false,
							role: 1
						})
					}
				}
			}
		})
	},

	bindGetUserInfo: function (e) {
		console.log(e.detail.userInfo)
		wx.setStorageSync('authUserInfo', true)
		wx.setStorageSync('userInfo', e.detail.userInfo)
		this.setData({
			authUserInfo: true,
			userInfo: e.detail.userInfo,
			role: wx.getStorageSync('role') || 0
		})
	},

	chooseRole:function(){
		if (!this.data.authUserInfo){
			wx.showToast({
				image: '../../assets/icons/bang.png',
				title: '请登录',
				duration: 1000,
			})
			return
		}
		this.setData({
			showModal:true,
		})
	},

	ImTeacher: function () {
		wx.setStorageSync('role', 2)
		this.setData({
			role: 2,
			showModal:false
		})
	},

	ImParent:function(){
		wx.setStorageSync('role', 3)
		this.setData({
			showModal: false,
			role:3
		})
	},

	goResume:function(){
		wx.navigateTo({
			url: '../myResume/myResume',
		})
	},

	goDemand:function(){
		wx.navigateTo({
			url: '../myDemand/myDemand',
		})
	},

	exit() {
		this.setData({
			showExit: true
		})
	},

	cancleExit() {
		this.setData({
			showExit: false
		})
	},

	sureExit() {
		wx.setStorageSync('authUserInfo', false)
		this.setData({
			showExit: false,
			userInfo:{},
			role:1,
			authUserInfo:false
		})
	},

	onPullDownRefresh: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})