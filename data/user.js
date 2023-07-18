import InfoData from "../class/InfoData"
import require from "../utils/require"
import { showMsg, getLocal, rule, setLocal, showAlert } from "../utils";

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
            setLocal('userInfo', this.info)
            this.$syncInfo().finally(() => {
              resolve()
            })
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
  $syncInfo() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/User.php',
        data: {
          status: "updateUserInfo",
          nickname: this.info.name,
          avatar: this.info.avatar
        }
      }).then((res) => {
        resolve(res)
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
          mobile: this.info.phone
        }
      }).then((res) => {
        this.info.name = res.data.nickname
        this.info.avatar = res.data.avatar
        // 自动鉴权不保存数据，避免数据更新问题
        // setLocal('userInfo', this.info)
        require.setToken(res.data.token)
        require.setRefreshToken(res.data.refreshToken)
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  $loginByPhone(form) {
    return new Promise((resolve, reject) => {
      this.status.load = 'ing'
      this.$syncPage()
      require.post({
        url: '/tb_api/api/Login.php',
        token: false,
        data: {
          status: "tradeLogin",
          mobile: form.phone,
          code: form.code
        }
      }).then((res) => {
        this.info.name = res.data.nickname
        this.info.avatar = res.data.avatar
        this.info.phone = form.phone
        setLocal('userInfo', this.info)
        require.setToken(res.data.token)
        require.setRefreshToken(res.data.refreshToken)
        this.status.load = 'success'
        this.$syncPage()
        resolve(res)
      }).catch(err => {
        this.status.load = 'un'
        console.error(err)
        this.$syncPage()
        reject(err)
      })
    })
  }
  $getData(auto) {
    return new Promise((resolve, reject) => {
      this.$authPhone().then(() => {
        this.$login().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        console.error(err)
        if (auto !== false) {
          my.navigateTo({
            url: `/pages/login/index`
          })
        }
        // showAlert(err, '鉴权失败！')
        reject(err)
      })
    })
  }
  $getDataByLoal() {
    const userInfo = getLocal('userInfo')
    if (userInfo && userInfo.phone && require.getToken()) {
      this.status.load = 'success'
      this.info = userInfo
      this.$syncPage()
    }
  }
}

const user = new UserData({
  name: '用户',
  prop: 'user'
})

user.$getDataByLoal()

export default user
