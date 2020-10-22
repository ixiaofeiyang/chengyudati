var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharetype: "guess",
    chuigerank:[],
    dengji:[],
    rank:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.chuigepaihang(1);
  },
  chuigeset: function (o) {
    var n = o.currentTarget.dataset.id;
    this.setData({
      rank:n
    }),this.chuigepaihang(n);
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
        }),t.initInterstitialAd();
    }
},
  onReady: function () {
    e.initConfig(this.initConfigBack);
  },
  chuigepaihang: function(o) {
    var n = this;
    if(o==1){
      const db = wx.cloud.database()
      n.data.chuigerank.length>0 ? (console.log('有数据')) : db.collection('user').field({
      nickname: true,
      headimgurl: true,
      level: true,
    }).limit(10).orderBy('level', 'desc').get().then(res => {
        console.log(res)
        n.setData({
          chuigerank:res.data
        })
      })
    }else if(o==2){
      const db = wx.cloud.database()
      n.data.dengji.length>0 ? (console.log('有数据')) : db.collection('userdengji').get().then(res => {
        console.log(res)
        n.setData({
          dengji:res.data
        })
        let chuigeranks=n.data.chuigerank;
        let dengjis=n.data.dengji;
        for(let index in chuigeranks) {
          for(let d in dengjis) {
            if(dengjis[d].max>=chuigeranks[index].level>=dengjis[d].min){
              chuigeranks[index].grade=dengjis[d].name
            }
          }
        }
        n.setData({
          chuigeduanwei:chuigeranks
        })
      })

    }
    
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: e.user,
      canIUseInterstitialAd: e.canIUseInterstitialAd
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
  initInterstitialAd: function () {
    if (0 !== e.canIUseInterstitialAd) {
      var t = this, a = t.data.setting;
      if (0 !== parseInt(a.screen_ad_status) && "" != a.screen_unit_id) {
        var i = null;
        wx.createInterstitialAd && ((i = wx.createInterstitialAd({
          adUnitId: a.screen_unit_id
        })).onLoad(function () {
          console.log("onLoad event emit");
        }), i.onError(function (t) {
          t.setData({
            canIUseInterstitialAd: !1
          }), console.log("onError event emit", t);
        }), i.onClose(function (t) {
          console.log("onClose event emit", t);
        })), t.setData({
          interstitialAd: i
        }),t.showInterstitialAd();
      }
    }
  },
  showInterstitialAd: function () {
    var t = this, e = this.data.interstitialAd;
    null != e && e.show().catch(function (e) {
      t.setData({
        canIUseInterstitialAd: !1
      });
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareTimeline: function () {
    var a = e.chuigeshare(this.data.sharetype), i = this.data.userInfo, n = "?from=" + this.data.sharetype;
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
    var a = e.chuigeshare(this.data.sharetype), i = this.data.userInfo, n = "?from=" + this.data.sharetype;
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