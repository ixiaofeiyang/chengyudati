var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharetype: "guess",
    chuigeuser: [],
    chuigeList: [ 1, 2, 3, 4, 5, 6 ],
    showVideoAdButton: !1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: e.user,
      canIUseInterstitialAd: e.canIUseInterstitialAd
    }), this.chuigeuser();
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
        }), t.initRewardVideoAd();
    }
},
  onReady: function () {
    e.initConfig(this.initConfigBack);
  },
  chuigeuser: function () {
    var e = this;
    const db = wx.cloud.database()
    db.collection('user').where({
      uuid: e.data.userInfo._id
    }).field({
      nickname: true,
      headimgurl: true,
      level: true,
    }).limit(5).get().then(res => {
      var i = res.data, n = e.data.chuigeList;
      i.length > 0 && n.splice(0, i.length), e.setData({
          chuigeuser: i,
          chuigeList: n
      });
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: e.user
    });
  },
initRewardVideoAd: function() {
  var count = wx.getStorageSync('showRewardedVideoAdCount');
  if (count >= parseInt(this.data.setting.day_video_num)){
     return false;
    }
    if (0 !== e.canIUseRewardedVideoAd) {
        var t = this, i = t.data.setting;
        if (0 !== parseInt(i.video_ad_status) && "" != i.video_unit_id) {
            var n = null;
            if (wx.createRewardedVideoAd) {
              n = wx.createRewardedVideoAd({
                adUnitId: 'adunit-cfc3eaa21df0d2b0'
              })
              n.onLoad(() => {
                t.setData({
                  showVideoAdButton: 1
              });
              })
              n.onError((e) => {
                console.log(e), t.setData({
                  showVideoAdButton: 0
              });
              })
              n.onClose((e) => {
                e && e.isEnded && t.sendVideoReward();
              }),t.setData({
                rewardedVideoAd: n
            });
            }
        }
    }
},
code: "",
sendVideoReward: function() {
  var t = this;
  var count = wx.getStorageSync('showRewardedVideoAdCount');
  var newCount = parseInt(count) + 1;
  wx.setStorage({
    key: 'showRewardedVideoAdCount',
    data: newCount,
  });
  var time = new Date().getTime();
  // 更新保存的时间
  wx.setStorage({
    key: 'saveVideoAdCountTime',
    data: time
  });
   const db = wx.cloud.database()
  db.collection('user').doc(e.user._id).update({
    // data 传入需要局部更新的数据
    data: { 
      gold_num: parseInt(t.data.setting.per_video_gold) + parseInt(t.data.userInfo.gold_num )},
    success: function (res) {
        console.log(res)
      "document.update:ok"== res.errMsg ? (t.setData({
        showVideoAdButton: false
      }), e.chuigeupdateUserGold(t.data.setting.per_video_gold, "+", t.onShow), e.happy("金币 + " + t.data.setting.per_video_gold),
        setTimeout(function () {
          1 || (e.updateConfig = !0);
        }, 500)) : e.sad('金币异常');
    }
  })
},
showRewardVideoAd: function() {
    var e = this, t = this.data.rewardedVideoAd;
    null != t && (wx.login({
        success: function(t) {
            e.code = t.code;
        },
        fail: function() {
            console.log("wx.login失败");
        }
    }), t.show().then(function() {
        console.log("广告开始显示");
    }).catch(function() {
        t.load().then(function() {
            return t.show().then(function() {
                console.log("广告重新拉取成功");
            });
        }).catch(function(t) {
            e.setData({
                showVideoAdButton: 0
            });
        });
    }));
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