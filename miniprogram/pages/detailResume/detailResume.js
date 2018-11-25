const db = wx.cloud.database();
const resume = db.collection('resume');

Page({

  data: {
    detail: {}
  },

  onLoad: function(options) {
		console.log(options)
    this.setData({
			id: options.id 
    });
  },

  onShow: function() {
    this.getDtail()
  },

  getDtail: function() {
    const self = this;
    const promise = new Promise((resolve, reject) => {
      const id = self.data.id ;
			console.log(id);
      resume.where({
				_id: id
        })
        .get({
          success: function(res) {
            console.log(res)
            if (res.data[0]) {
              self.setData({
								detail: res.data[0]
              }, () => {
                if (res.data[0].photoId) {
                  self.getPhotoUrl(res.data[0].photoId)
                }
              })
            }
            wx.hideLoading()
          },
          fail: function(err) {
            wx.showModal({
              content: err,
            })
            wx.hideLoading()
          }
        })
    })
    return promise
  },

	getPhotoUrl: function (photoId) {
		let fileList = [];
		fileList.push(photoId)
		const self = this;
		wx.cloud.getTempFileURL({
			fileList,
			success: res => {
				console.log(res.fileList)
				const detail = JSON.parse(JSON.stringify(self.data.detail))
				detail.photoUrl = res.fileList[0].tempFileURL
				self.setData({
					detail
				})
			},
			fail: console.error,
			complete: function () {
				wx.hideLoading()
			}
		})
	},

	contact:function(){
		// wx.navigateTo({
		// 	url: '../message/message',
		// })
		const self = this;
		wx.navigateTo({
			url: '../temp/temp?contact=' + self.data.detail.contactWay,
		})
	}
})