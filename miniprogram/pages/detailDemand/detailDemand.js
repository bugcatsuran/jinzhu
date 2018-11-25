const cities = [{
    name: '北京市',
    id: 1000
  },
  {
    name: '深圳市',
    id: 1001
  }
]
const db = wx.cloud.database();
const demand = db.collection('demand');
Page({

  /**
   * 页面的初始数据
   */  
  data: {
    cities,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getDemand()
  },

  getDemand: function () {
    const self = this;
    const promise = new Promise((resolve, reject) => {
      const id = self.data.id;
      console.log(id);
      demand.where({
        _id: id
      })
        .get({
          success: function (res) {
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
          fail: function (err) {
            wx.showModal({
              content: err,
            })
            wx.hideLoading()
          }
        })
    })
    return promise
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})