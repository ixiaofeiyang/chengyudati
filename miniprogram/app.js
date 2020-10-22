//app.js
function e(e) {
  return function() {
    var i = e.apply(this, arguments);
    return new Promise(function(e, n) {
      function s(t, o) {
        try {
          var a = i[t](o),
            r = a.value;
        } catch (e) {
          return void n(e);
        }
        if (!a.done) return Promise.resolve(r).then(function(e) {
          s("next", e);
        }, function(e) {
          s("throw", e);
        });
        e(r);
      }
      return s("next");
    });
  };
}
App({
  user: {
    nickname: "未登录",
    headimgurl: "../../images/icon/default.png",
    gold_num: 0,
    balance: 0,
    grade:"入门青铜",
    level: 0
  },
  uuid: 0,
  sign: {},
  systemInfo: {},
  windowH: 0,
  userInfo: {
    sessionid: null,
    _id: null,
  },
  config: null,
  canIUseInterstitialAd: !1,
  canIUseRewardedVideoAd: !1,
  registerStatus: !1,
  refreshUser: !1,
  images: {
    share: "https://mmbiz.qpic.cn/mmbiz_jpg/ku3xq2Kto4Y3U35qOLN94tN7BgTDVLsAobD6tK8iaPyeBmjrGfDYzYZxKgyo7rdae3tmVO6MWweFSCvfdRLn9YQ/0?wx_fmt=jpeg"
  },
  onLaunch: function (e) { 
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    e.query.hasOwnProperty("uuid") && (this.uuid = e.query.uuid),
    this.initSysInfo(), this.sessionCheck(), 
    wx.createRewardedVideoAd && (this.canIUseRewardedVideoAd = !0);
    this.globalData = {}
  },
  usermember:function(e) {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
    i = this;
  //console.log('login',i.userInfo.sessionid);
  const db = wx.cloud.database()
  db.collection('user').where({
    _openid: i.userInfo.sessionid
  }).get().then(res => {
    if(res.data.length>0){
      i.registerStatus = !0;
      var s = res.data[0];
          s.level = parseInt(s.level), i.user = s;e && e();
    } else console.log("登录失败");
    0 != e && e(), i.refreshUser = !1;
    })
  },
  sessionCheck: function() {
    var e = this,
      i = wx.getStorageSync("userInfo").sessionid;
    console.log('sessionid ', i);
    i ? e.userInfo.sessionid = i : e.getSessionId();
  },
  chuigeupdateUserGold: function(e, i) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      s = this.user;
    if ("+" === i) s.gold_num = parseInt(s.gold_num) + parseInt(e);
    else {
      if ("-" !== i) return;
      s.gold_num -= parseInt(this.config.setting.data.per_guess_gold);
    }
    this.user = s, n && n();
  },
  chuigeuplevel: function(e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      s = this.user;
      e==1 ? s.level += parseInt(1) :  console.log('升级了');
      this.user = s,n && n();
  },
  sad: function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
    wx.showToast({
      title: e,
      image: "/images/icon/sad.png",
      duration: i
    });
  },
  happy: function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
    wx.showToast({
        title: e,
        image: "/images/icon/happy.png",
        duration: i
    });
},
  getSessionId: function() {
    var e = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        //console.log('openid ', res);
        var n = res.result.openid;
        e.userInfo.sessionid = n, wx.setStorageSync("userInfo", e.userInfo)
        //e.usermember(),this.refreshUser=!1
      }
    });
  },
  initSysInfo: function() {
    var e = wx.getSystemInfoSync(),
      i = e.windowHeight * (375 / e.screenWidth) * 2;
    this.systemInfo = e, this.windowH = i;
  },
  register: function(e,initUser) {
    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    e.uuid = this.uuid; e.gold_num = this.config.setting.data.defaultjinbi;
    var s = this;
   // this.usermember(e);
    wx.cloud.callFunction({
      name: 'login',
      data: {
        action: 'registuser',
        e: e,
      },
      success: res => {
        "cloud.callFunction:ok" == res.errMsg ? (res.result.errMsg=="collection.add:ok" ? (s.usermember(initUser),s.refreshUser=!1) : (s.usermember(initUser),s.refreshUser=!1)) :
        console.warn('[云函数] [registuser]调用成功：', res);
        
      },
      fail: err => {
        s.usermember(initUser),s.refreshUser=!1
      }
    });
  },
  chuigeshare: function(e) {
    var i = {
      title: "[微信红包] 答题兑现金，分分钟变土豪！",
      imageUrl: this.images.share
    };
    if (null == this.config) return i;
    var n = this.config.share[e];
    if (n.length > 0) {
      var s = Math.floor(Math.random() * n.length);
      i.title = n[s].title, i.imageUrl = n[s].image;
    }
    return i;
  },
  initConfig: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], s = this;
    const db = wx.cloud.database()
    null == s.config || i ? (
        db.collection('setting').doc('1b64dd7b5f6f19b0008a16a21d4b8fd6').get().then(res => {
      // res.data 包含该记录的数据
      //console.log(res)
      "document.get:ok" == res.errMsg ? (s.config = res.data, s.updateConfig = !1, e && e(res.data)) : e && e();
    })
    ) : e && e(this.config);
  },
})
