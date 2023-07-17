import InfoData from "../class/InfoData"
import require from "../utils/require"
import { showMsg } from "../utils";

class UserData extends InfoData{
  constructor(initOption) {
    super(initOption)
  }
  // $auth(scopes) {
  //   return new Promise((resolve, reject) => {
  //     my.authorize({
  //       scopes: ['scope.userInfo', 'scope.addressList', 'scope.getPhoneNumber'],
  //       success: () => {
  //         this.$authNext().then(() => {
  //           resolve()
  //         }).catch(err => {
  //           reject(err)
  //         })
  //       },
  //       fail:(err)=>{
  //         console.error(err)
  //         showMsg('请在小程序授权管理设置里开启相关权限才能进行下一步操作哦~')
  //         reject(err)
  //       }
  //     })
  //   })
  // }
  $auth(scopes) {
    return new Promise((resolve, reject) => {
      my.authorize({
        scopes: scopes,
        success: () => {
          resolve()
        },
        fail:(err)=>{
          console.error(err)
          // showMsg('请在小程序授权管理设置里开启相关权限才能进行下一步操作哦~')
          reject(err)
        }
      })
    })
  }
  $authPhone() {
    return new Promise((resolve, reject) => {
      this.$auth(['scope.getPhoneNumber']).then(() => {
        require.top({
          api: 'taobao.miniapp.user.phone.get',
          scope: 'scope.getPhoneNumber'
        }).then((res) => {
          this.info.phone = res.phone
          resolve(res)
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  $authInfo() {
    return new Promise((resolve, reject) => {
      this.$auth(['scope.getPhoneNumber']).then(() => {
        my.getAuthUserInfo({
          success:(res)=>{
            this.info.name = res.nickName
            this.info.avatar = res.avatar
            resolve()
          },
          fail:(err)=>{
            console.log(err)
            resolve(err)
          }
        })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  $authNext() {
    return new Promise((resolve, reject) => {
      Promise.allSettled([this.$authPhone(), this.$authInfo]).then(() => {
        this.$login().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
  $login() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Login.php',
        token: false,
        data: {
          status: "tradeLogin",
          mobile: this.info.phone,
          nickname: this.info.name,
          avatar: this.info.avatar
        }
      }).then((res) => {
        require.setToken(res.data.token)
        require.setRefreshToken(res.data.refreshToken)
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  $getData(auto) {
    return new Promise((resolve, reject) => {
      this.$authPhone().then(() => {
        resolve()
      }).catch(err => {
        console.error(err)
        if (auto !== false) {
          my.navigateTo({
            url: `/pages/login/index`
          })
        }
        reject(err)
      })
    })
  }
}

const user = new UserData({
  name: '用户',
  prop: 'user'
})

export default user
