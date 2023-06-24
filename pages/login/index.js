import user from "./../../data/user";

Page({
  data: {
    [user.$prop]: user
  },
  bingAutoLogin() {
    my.authorize({
      scopes: ['scope.userInfo'],
      success: (res) => {
        console.log(res)
        my.getAuthUserInfo({
          success:(res)=>{
            console.log(res)
          },
          fail:(err)=>{
            console.log(err)
          }
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    });
  },
  onLoad() {
    user.$appendPage(this)
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/home/index',
    };
  },
});
