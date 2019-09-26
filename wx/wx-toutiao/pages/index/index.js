//index.js
var app = getApp();
var api = new Proxy(
    wx,
    {
        get(target, key) {
            if (typeof target[key] === 'function') {
                return function (params, ...args) {
                    return new Promise((resolve, reject) => {
                        target[key]({
                            ...params,
                            success: (...args) => {
                                resolve(...args);
                                params.success && params.success(...args);
                            }
                        }, ...args);
                    });
                }.bind(target);
            }
        }
    }
);
// 测试a
Page({

  data: {
    list: []
  },

  onLoad() {
    api.request({
      url: 'http://localhost:9000/list',
      success: ({data}) => {
        console.log('ajax-res-me:', data.data);
        this.setData({
          list: data.data
        });
      }
    })
    .then(res => {
        console.log('res:::', res);
    });
    wx.getStorage({
      key: 'loginToken',
      success: function(res) {
        // 直接进行逻辑
        console.log('登录过了，直接继续')
      },
      fail: (err) => {
        console.log('未登录，现在正在登陆中...')
        this.login()
      }
    })
    
  },
  login(){
    wx.login({
      success(res) {
        console.log(res.code)
        wx.request({
          url: `http://127.0.0.1:9000/login?code=${res.code}`,
          success(res) {
            wx.setStorage({
              key: 'loginToken',
              data: res.data.data.openid
            })
          }
        })
      }
    })
  }
});