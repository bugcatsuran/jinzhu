//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
				traceUser:true,
				// env:{		
				// 	database: 'dev-2b79a2',
				// 	storage:'dev-2b79a2',
				// 	functions:'dev-2b79a2'
				// },
				env: {
					database: 'production-2b79a2',
					storage: 'production-2b79a2',
					functions: 'production-2b79a2'
				},
			})
    }

    this.globalData = {}
  }
})
