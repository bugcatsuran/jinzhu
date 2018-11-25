const db = wx.cloud.database();
const resume = db.collection('resume');
const cityData = [
	{name:'北京市'},
	{name:'深圳市'}
]

Page({
	data: {
		resumeInfo:{
			type:1,
		},
		showModal:false,
		currentKey:'',
		inputValue:'',
		cityData,
	},

	onLoad: function (options) {
		const openid = wx.getStorageSync('openid');
		console.log(openid,'openid')
		if(openid){
			this.getInfo()
		}else{
			this.login().then(() => {
				self.getInfo()
			});;
		}
	},

	getInfo:function(){
		const self = this;
		wx.showLoading({
			title: '正在加载',
		})
		resume.where({
			_openid:wx.getStorageSync('openid')
		})
		.get({
			success: function (res) {
				console.log(res)
				if(res.data[0]){
					self.setData({
						resumeInfo: res.data[0]
					}, () => {
						if (res.data[0].photoId){
							self.getPhotoUrl(res.data[0].photoId)
						}
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

	getPhotoUrl: function (photoId){
		let fileList = [];
		fileList.push(photoId)
		const self = this;
		wx.cloud.getTempFileURL({
			fileList,
			success: res => {
				console.log(res.fileList)
				const resumeInfo = JSON.parse(JSON.stringify(self.data.resumeInfo))
				resumeInfo.photoUrl = res.fileList[0].tempFileURL
				self.setData({
					resumeInfo
				})
			},
			fail: console.error,
			complete:function(){
				wx.hideLoading()
			}
		})
	},

	login: function () {
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

	modifyInfo:function(e){
		const key = e.currentTarget.dataset.key;
		const inputValue = this.data.resumeInfo[key]||'';
		this.setData({
			showModal:true,
			currentKey:key,
			inputValue
		})
	},

	input:function(e){
		const value = e.detail.value;
		this.setData({
			inputValue: value 
		})
	},

	cancleModal:function(e){
		this.setData({
			showModal: false,
			inputValue: this.data.resumeInfo[this.data.currentKey]
		})
	},

	sureModal:function(e){
		let resumeInfo = Object.assign({}, this.data.resumeInfo)
		resumeInfo[this.data.currentKey] = this.data.inputValue;
		this.setData({
			showModal: false,
			resumeInfo
		})
	},

	publish:function(){
		wx.showLoading({
			title: '正在发布更新',
			mask:true
		})
		if (!this.data.resumeInfo._id){
			this.add();
		}else{
			this.update()
		}
	},

	add: function (){
		let info = JSON.parse(JSON.stringify(this.data.resumeInfo));
		info.photoUrl = ''
		resume.add({
			data: info,
			success:function(res){
				wx.showModal({
					content: '发布成功',
				})
			},
			complete:function(){
				wx.hideLoading();
			}
		})
	},

	update:function(){
		let info = JSON.parse(JSON.stringify(this.data.resumeInfo));
		delete info._id;
		delete info._openid;
		info.photoUrl = ''
		resume.doc(this.data.resumeInfo._id).update({
			data:info,
			success: function (res) {
				wx.showModal({
					content: '发布成功',
				})
			},
			fail:function(err){
				console.log(err)
			},
			complete: function () {
				wx.hideLoading();
			}
		})
	},

	out:function(){
		let info = JSON.parse(JSON.stringify(this.data.resumeInfo));
		delete info._id;
		delete info._openid;
		info.photoUrl = ''
		info.style = 'N';
		resume.doc(this.data.resumeInfo._id).update({
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

	uploadAvator:function(){
		const self = this;
		wx.chooseImage({
			count: 1,
			sizeType: ["compressed"],
			success(res) {
				console.log(res.tempFilePaths[0])
				const resumeInfo = JSON.parse(JSON.stringify(self.data.resumeInfo))
				resumeInfo.photoUrl = res.tempFilePaths[0];
				self.setData({
					resumeInfo
				})
				self.cloudUpload(res.tempFilePaths[0])
			}
		})
	},

	cloudUpload:function(filePath){
		wx.showLoading({
			title: '正在上传图片',
			mask:true
		})
		const self = this;
		wx.cloud.uploadFile({
			cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
			filePath,
			success: res => {
 				let resumeInfo = JSON.parse(JSON.stringify(self.data.resumeInfo));
				resumeInfo.photoId = res.fileID;
				self.setData({
					resumeInfo
				},()=>{
					self.getPhotoUrl(resumeInfo.photoId)
				})
			},
			fail: console.error
		})
	},

	toogleChooseCity:function(){
		this.setData({
			chooseCity: !this.data.chooseCity
		})
	},

	chooseCity:function(e){
		const city = e.currentTarget.dataset.value;
		console.log(city)
		let resumeInfo = JSON.parse(JSON.stringify(this.data.resumeInfo));
		resumeInfo.city = city
		this.setData({
			resumeInfo
		})
	},

	onPullDownRefresh: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})