var t = getApp();
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
     this.chuigeduiyuan();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    t.initConfig(this.initConfigBack);
},
initConfigBack: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, i = this;
    if (null != t) {
        var o = t.setting;
        o.status && i.setData({
            setting: o.data
        });
    }
},
  chuigeduiyuan: function() {
    var n = this;
  const db = wx.cloud.database()  
  db.collection('goods').limit(20).get()
    .then(res => {
      console.log(res)
     n.setData({
       chuigeduihuan: res.data
      });
    })
},
chuigediuhuango: function(i) {
    var o = t.user;
    //if ("" != o.realname && "" != o.mobile && "" != o.wxid) {
        var n = this, a = i.currentTarget.dataset.index, s = this.data.chuigeduihuan[a], e = i.detail.formId;
        wx.showModal({
            title: "兑换确认",
            content: "您确定要使用 " + s.price + " 元来兑换这个商品吗",
            cancelText: "考虑一下",
            confirmText: "立即兑换",
            confirmColor: "#5735B7",
            success: function(i) {
              i.confirm && t.sad('余额不足');
              /*  t.util.request({
                    url: "entry/wxapp/exchange",
                    data: {
                        form_id: e,
                        goods_id: s.id
                    },
                    success: function(i) {
                        if (0 == i.data.code) return n.initGoods(), t.refreshUser = !0, void t.happy("兑换成功");
                        t.sad(i.data.message);
                    },
                    fail: function(t) {
                        console.log("请求积分商品:fail");
                    }
                });*/
            }
        });
   // } else t.sad("请先完善信息");

},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: t.user,
      canIUseInterstitialAd: t.canIUseInterstitialAd
    });
  },
  chuigekefu: function() {
    var t = this.data.setting;
    "" != t.kf_wxid && wx.setClipboardData({
        data: t.kf_wxid,
        success: function(t) {
            wx.showModal({
                title: "复制成功",
                content: "客服微信号复制成功，请添加微信，审核您的历史兑换",
                confirmText: "我知道了",
                confirmColor: "#fd5757",
                success: function(t) {}
            });
        }
    });
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
    var a = t.chuigeshare(this.data.sharetype), i = this.data.userInfo, n = "?from=" + this.data.sharetype;
    return "1" == i.status && (n += "&uuid=" + i._id), {
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
    var a = t.chuigeshare(this.data.sharetype), i = this.data.userInfo, n = "?from=" + this.data.sharetype;
    return "1" == i.status && (n += "&uuid=" + i._id), {
      title: a.title,
      path: '/pages/index/index' + n,
      imageUrl: a.imageUrl,
      success: function (t) { },
      fail: function (t) { },
      complete: function () { }
    };
  }
})