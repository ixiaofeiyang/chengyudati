var t = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      chuigetanchuguanka:false,
      chuigetanchuhongbao:false,
      chuigehongbao: {
        status: !1,
        balance: 0,
        openStatus: !1
      },
      chuigeindex:0,
      chuigewentilist:[{title:"1晚上睡觉我的睡前仪式是？",daan:2,xuanze:[{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"}]},
      {title:"2晚上睡觉我的睡前仪式是？",daan:2,xuanze:[{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"}]},
      {title:"3晚上睡觉我的睡前仪式是？",daan:2,xuanze:[{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"}]},
      {title:"4晚上睡觉我的睡前仪式是？",daan:2,xuanze:[{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"}]}],
      chuigewenti:{id:1,title:"1晚上睡觉我的睡前仪式是？",daan:2,xuanze:[{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"},{name:"秋衣塞进秋裤里"}]},
      chuigeerrIndex:[],
      resultStatus: !1,
      sharetype: "guess",
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chuigewentilist();
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    t.initConfig(this.initConfigBack);
  },
  initConfigBack: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = this;
    if (null != t) {
      var a = t.setting, i = t.adv, n = t.mp3;
      a.status && e.setData({
        setting: a.data
      }), e.setData({
        adv: i
      }), this.initAudio(n), e.initInterstitialAd();
    }
  },
  audio: {
    correct: null
  },
  bgPlay: function (t) {
    null != this.audio[t] && this.audio[t].play();
  },
  chuigeLoginCancel: function() {
    this.setData({
      chuigeloginStatus: !1
    });
},
chuigeshowLogin: function() {
  this.setData({
    chuigeloginStatus: !0
  });
},
  chuigeLoginConfirm: function(e) {
    var a = e.detail.result, i = this;
    if (a.userInfo) {
        var n = a.userInfo;
        n.vid = i.data.vid, t.register(n, i.initUser), i.setData({
          chuigeloginStatus: !1
        });
    } else console.log("用户未允许授权");
},
  initAudio: function (t) {
    if ("" != t.correct) {
      var e = wx.createInnerAudioContext();
      e.autoplay = !1, e.src = t.correct, this.audio.correct = e;
    }
  },
  initUser: function() {
    this.setData({
        userInfo: t.user
    });
 },
  initInterstitialAd: function () {
    if (0 !== t.canIUseInterstitialAd) {
      var e = this, a = e.data.setting;
      if (0 !== parseInt(a.screen_ad_status) && "" != a.screen_unit_id) {
        var i = null;
        wx.createInterstitialAd && ((i = wx.createInterstitialAd({
          adUnitId: a.screen_unit_id
        })).onLoad(function () {
          console.log("onLoad event emit");
        }), i.onError(function (t) {
          e.setData({
            canIUseInterstitialAd: !1
          }), console.log("onError event emit", t);
        }), i.onClose(function (t) {
          console.log("onClose event emit", t);
        })), e.setData({
          interstitialAd: i
        });
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: t.user,
      canIUseInterstitialAd: t.canIUseInterstitialAd
    });
  },
  chuigewentilist: function () {
    var e = this;
    const db = wx.cloud.database()
    db.collection('chengyu').aggregate().sample({
      size: 10
    }).end().then(res => {
      var data = res.list;
      data.forEach((item,index) => {
        data[index].keyword = item.keyword.split('');
        data[index].alternatives=item.alternatives.split(",");
        data[index].keyword[item.key_index]="?";
      })
      "collection.aggregate:ok" == res.errMsg && (
        res.list.length > 0 ? e.setData({
        resultStatus: !1,
        chuigewentilist: data,
        chuigeindex: 0,
        chuigewenti: data[0]
      }) : e.setData({
        resultStatus: !1,
        noMoreTopic: !0
      }));
    });
  },
  inChecking: !1,
  chuigehongbao: function () {
    return {
      status: !1,
      kkid: "",
      balance: 0,
      openStatus: !1
    };
  },
  chuigecheck: function (options) {
     console.log(options);
     var self = this, i = "", n = "", o = !1, s = this.chuigehongbao(), r = this.data, c = r.userInfo, d = r.chuigeerrIndex, l = r.setting;
     if (t.registerStatus){
      if (parseInt(c.gold_num) - parseInt(l.per_guess_gold) < 0) { 
        wx.showModal({
        title: "温馨提示",
        content: "您的金币已经不足，请返回小程序首页，获取更多金币",
        confirmText: "我知道了",
        confirmColor: "#fd5757",
        success: function (t) {
          t.confirm && wx.navigateBack({
            delta: 2
          });
        }
      })} else {
        var dati = 1;
        if(self.data.userInfo && !self.data.userInfo._id){
          self.initUser();
        }
        var indexs=options.target.dataset.id;
        if(indexs == parseInt(self.data.chuigewenti.res_index)){
          dati=1;
          var datas = {
            level: self.data.userInfo.level+1,
            gold_num: parseInt(self.data.userInfo.gold_num) - parseInt(l.per_guess_gold),
          }
        }else{
          dati=2;
          var datas = {
            gold_num: parseInt(self.data.userInfo.gold_num) - parseInt(l.per_guess_gold),
          }
        }
        const db = wx.cloud.database()
        d.includes(indexs) ? console.log("点过了") : self.inChecking ? console.log("点击太快了哦") : (self.inChecking = !0,
        // const db = wx.cloud.database()
        db.collection('user').doc(self.data.userInfo._id).update({
            // data 传入需要局部更新的数据
          data: datas,
            success: function (res) {
              dati == 1 ? (
                self.showInterstitialAd(), d = [], self.bgPlay("correct"),o = !0,t.chuigeuplevel(1),t.chuigeupdateUserGold(self.data.setting.per_guess_gold, "-"),
                (parseInt(self.data.userInfo.level) % parseInt(self.data.setting.dati_hongbao_num)) == 0 && db.collection('hongbao').where({ level: self.data.userInfo.level }).get().then(e => {
                  e.data.length > 0 && (e.data[0].status && (s = e.data[0], self.setData({ chuigehongbao: s,chuigetanchuhongbao:1 })))
          })) : d.includes(indexs) || d.push(indexs),
           dati == 2 && t.sad('回答错误');
           self.setData({
                 chuigetanchuguanka: o,
                 chuigeerrIndex: d,
                 chuigehongbao: s,
                }), self.initUser(),
  
              console.log(res)
            },
            complete: function () {
              self.inChecking = !1, console.log("check complete");
            }
          }));
    }
    } else this.chuigeshowLogin();
  },
  chuigeopenhongbao: function () {
    var e = this, a = this.data.chuigehongbao;
    const db = wx.cloud.database()
    1 == a.status && db.collection('user').doc(e.data.userInfo._id).update({
      // data 传入需要局部更新的数据
      data: { balance: parseFloat(e.data.userInfo.balance) + parseFloat(a.balance)},
      success: function (res) {
          console.log(res)
        "document.update:ok" == res.errMsg ? (a.openStatus = !0, a = Object.assign(a, a),
          e.setData({
            chuigehongbao: a,
          }), t.refreshUser = !0) : t.sad('红包打开成功');
      }
    })
  },
  initUser: function () {
    this.setData({
      userInfo: t.user
    });
  },
  chuigedown: function() {
    if(this.data.chuigeindex>this.data.chuigewentilist.length-1){
      this.chuigewentilist(),this.setData({
        chuigewenti: this.data.chuigewentilist[0],
        chuigetanchuguanka: !1,
        chuigeerrIndex:[],
        chuigeindex:0
      })
    }else{
      this.setData({
        chuigewenti: this.data.chuigewentilist[this.data.chuigeindex+1],
        chuigetanchuguanka: !1,
        chuigeerrIndex:[],
        chuigeindex:this.data.chuigeindex+1,

      })
    }
    
  },
  chuigeclosehongbao: function() {
    this.setData({
      chuigetanchuhongbao: false
    })
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
  }
  }
})