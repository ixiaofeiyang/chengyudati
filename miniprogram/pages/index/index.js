//index.js
const e = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    guize:false,
    sharetype: "guess",
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    var i = this;
    e.sessionCheck(), e.usermember(i.userCallback);
    // 获取用户信息
    /*wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })*/

  },
  onShow: function () {
      e.refreshUser ? (console.log("更新用户"),
      e.usermember(this.userCallback)) : (console.log("不更新"), this.setData({
        userInfo: e.user,
        canIUseInterstitialAd: e.canIUseInterstitialAd
      }), this.chuigechapingshow());
  },
  initConfigBack: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, i = this;
    if (null != t) {
      var e = t.setting, n = t.adv, a = "360rpx";
      e.status && (e.data.hasOwnProperty("gzh_img") && "" != e.data.gzh_img && "" != e.data.gzh_ewm_img && (a = "480rpx"),
        i.setData({
          setting: e.data
        }), "" !== e.data.name && wx.setNavigationBarTitle({
          title: e.data.name
        })), i.setData({
          adv: n,
          ylboxh: a
        }), i.chuigechaping();
    }
  },
  onReady: function () {
    this.initSystemInfo(), e.initConfig(this.initConfigBack);
  },
  initSystemInfo: function () {
    var t = wx.getSystemInfoSync(), i = t.windowHeight * (750 / t.screenWidth), e = i - 100, n = e - 224;
    this.setData({
      windowH: i,
      boxH: e,
      rankListH: n
    });
  },

  chuigeshowbox: function() {
    this.setData({
      guize: true
    })
  },
  chuigeclosebox: function() {
    this.setData({
      guize: false
    })
  },
  chuigegame: function() {
    wx.navigateTo({
      url: "/pages/game/game"
    });
  },
  chuigejinbi: function() {
    wx.navigateTo({
      url: "/pages/chuigejinbi/chuigejinbi"
    });
  },
  chuigepaihang: function() {
    wx.navigateTo({
      url: "/pages/chuigepaihang/chuigepaihang"
    });
  },
  chuigemore: function() {
    wx.navigateTo({
      url: "/pages/chuigemore/chuigemore"
    });
  },
  chuigewenti: function() {
    wx.navigateTo({
      url: "/pages/chuigewenti/chuigewenti"
    });
  },
  chuigeduihuan: function() {
    wx.navigateTo({
      url: "/pages/chuigeduihuan/chuigeduihuan"
    });
  },
  userCallback: function () {
    this.setData({
      userInfo: e.user,
      registerStatus: e.registerStatus
    });
  },
  chuigechaping:function() {
    if (0 !== e.canIUseInterstitialAd) {
      var t = this, i = t.data.setting;
      if (0 !== parseInt(i.screen_ad_status) && "" != i.screen_unit_id) {
        var n = null;
        wx.createInterstitialAd && ((n = wx.createInterstitialAd({
          adUnitId: i.screen_unit_id
        })).onLoad(function () {
          console.log("onLoad event emit");
        }), n.onError(function (i) {
          t.setData({
            canIUseInterstitialAd: !1
          }), console.log("onError event emit", i);
        }), n.onClose(function (t) {
          console.log("onClose event emit", t);
        })), t.setData({
          interstitialAd: n
        }), t.chuigechapingshow();
      }
    }
  },
  chuigechapingshow:function(){
    var t = this, i = this.data.interstitialAd;
    null != i && i.show().catch(function (i) {
      t.setData({
        canIUseInterstitialAd: !1
      });
    });
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
  onShareAppMessage:function(){
    var a = e.chuigeshare(this.data.sharetype), i = this.data.userInfo, n = "?from=" + this.data.sharetype;
    return "1" == i.status && (n += "&uuid=" + i._id), {
      title: a.title,
      path: '/pages/index/index' + n,
      imageUrl: a.imageUrl,
      success: function (t) { },
      fail: function (t) { },
      complete: function () { }
  }}
})
