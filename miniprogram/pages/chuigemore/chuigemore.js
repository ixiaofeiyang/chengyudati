// miniprogram/pages/chuigemore/chuigemore.js
var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharetype: "guess",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chuigemore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  initConfigBack: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = this;
    if (null != e) {
        var i = e.setting;
        i.status && t.setData({
            setting: i.data
        });
    }
},
  onReady: function () {
    e.initConfig(this.initConfigBack);
  },
  chuigemore: function() {
    var n = this;
  const db = wx.cloud.database()  
  db.collection('moreapp').limit(20).get()
    .then(res => {
      console.log(res)
     n.setData({
       chuigemore: res.data
      });
    })
},
chuigeapp: function (t) {
  var n = t.currentTarget.dataset.index, a = this.data.chuigemore[n];
  wx.navigateToMiniProgram({
      appId: a.appid,
      path: a.path,
      success: function(t) {}
  });
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareTimeline: function () {
    var a = e.chuigeshare(this.data.sharetype),  n = "?from=" + this.data.sharetype;
    return  {
      title: a.title,
      path: '/pages/index/index' + n,
      imageUrl: a.imageUrl,
      success: function (t) { },
      fail: function (t) { },
      complete: function () { }
  }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var a = e.chuigeshare(this.data.sharetype),  n = "?from=" + this.data.sharetype;
    return  {
      title: a.title,
      path: '/pages/index/index' + n,
      imageUrl: a.imageUrl,
      success: function (t) { },
      fail: function (t) { },
      complete: function () { }
  }
  }
})