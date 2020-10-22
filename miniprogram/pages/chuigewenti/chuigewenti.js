var n = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      chuigeindex:-1,
      chuigewenti: [ {
        name: "成语答题小程序怎么玩",
        miaoshu: "您可以点击首页「开始闯关」，找出正确答案，既能学习知识又能赚钱"
    }, {
      name: "为什么提示我的金币不足",
      miaoshu: "亲，成语答题需要消耗金币哦，您可以通过邀请好友，或者看激励视频获取金币"
    }, {
      name: "成语答题奖励是什么",
      miaoshu: "亲，您随机获得的奖励，可用于兑换商品哦"
    }, {
      name: "商品兑换后如何发货",
      miaoshu: "从首页进入「兑换」页面，点击复制客服微信，添加咨询哦"
    }, {
      name: "这个小程序收费吗",
      miaoshu: "不会的，这是一款免费的成语答题小程序，供您休闲娱乐、益智消遣使用"
    }, {
      name: "还有别的好玩的程序推荐吗",
      miaoshu: "点击首页「更多好玩」，会有其他好玩的程序哦"
    }, {
      name: "成语答题作者",
      miaoshu: "成语答题有奖小程序由程序员锤哥开发完成，版权归程序员锤哥所有，若需要搭建可联系锤哥微信：chuige365"
    } ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    null != n.config && this.setData({
      setting: n.config.setting.data
  });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  chuigetap: function (n) {
    var t = n.currentTarget.dataset.index, i = this.data.chuigeindex;
    this.setData({
      chuigeindex: t === i ? -1 : t
    });
  },
  chuigeback: function() {
    wx.navigateBack({
        delta: 1
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


})