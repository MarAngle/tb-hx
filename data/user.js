import BaseData from "../class/BaseData";
import { rule, showAlert, showMsg } from "../utils";
import require from "../utils/require";

class UserData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.status.login = false
    this.status.type = 'auth'
    this.info = {
      phone: undefined,
      name: undefined,
      avatar: undefined
    }
    this.form = {
      phone: '',
      code: ''
    }
    this.code = {
      ing: false,
      operate: false,
      count: 60
    }
  }
  changeForm(prop, value) {
    this.form[prop] = value
  }
  checkForm(unCode) {
    if (rule.mobile.test(this.form.phone)) {
      if (unCode || this.form.code.length >= 4) {
        return false
      } else {
        showMsg('请输入验证码！', 'fail')
        return true
      }
    } else {
      showMsg('请正确输入手机号！', 'fail')
      return true
    }
  }
  getCode() {
    if (!this.checkForm(true)) {
      this.code.ing = true
      this.$syncPage()
      require.post({
        url: '/washService/loginAction.php',
        token: false,
        data: {
          scene: "H5",
          status: "getCode",
          mobile: this.form.phone
        }
      }).then(() => {
        this.code.ing = false
        this.code.operate = true
        this.startCount()
        this.$syncPage()
      }).catch(err => {
        console.error(err)
        this.code.ing = false
        this.$syncPage()
      })
    }
  }
  loginByPhone() {
    if (!this.checkForm()) {
      require.post({
        url: '/washService/loginAction.php',
        token: false,
        data: {
          scene: "H5",
          status: "checkLogin",
          city_Index: "1",
          mobile: this.form.phone,
          code: this.form.code
        }
      }).then((res) => {
        require.setToken(res.data.token)
        require.setRefreshToken(res.data.refreshToken)
        this.status.login = true
        this.$syncPage()
      }).catch(err => {
        console.error(err)
        this.$syncPage()
      })
    }
  }
  startCount() {
    this.code.count = 60
    this.runCount()
  }
  runCount() {
    setTimeout(() => {
      this.code.count = this.code.count - 1
      if (this.code.count === 0) {
        this.code.operate = false
      } else {
        this.runCount()
      }
      this.$syncPage(true)
    }, 1000)
  }
  auth(force) {
    return new Promise((resolve, reject) => {
      if (force || !this.status.login) {
        my.authorize({
          scopes: ['scope.userInfo', 'scope.addressList', 'scope.getPhoneNumber'],
          success: () => {
            this.getAuthInfo().then((info) => {
              this.loginByAuth(info).then(res => {
                this.status.login = true
                this.$syncPage()
                resolve(res)
              }).catch(err => {
                console.error(err)
                reject(err)
              })
            }).catch(err => {
              console.error(err)
              reject(err)
            })
          },
          fail:(err)=>{
            console.log(err)
            reject(err)
          }
        })
      } else {
        resolve({ status: 'success', code: 'logined' })
      }
    })
  }
  getPhoneNumber() {
    return new Promise((resolve, reject) => {
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
    })
  }
  getAuthInfo() {
    return new Promise((resolve, reject) => {
      this.getPhoneNumber().then(() => {
        my.getAuthUserInfo({
          success:(infoRes)=>{
            this.$syncPage()
            resolve({
              mobile: this.info.phone,
              nickname: infoRes.nickName,
              avatar: infoRes.avatar
            })
          },
          fail:(err)=>{
            console.log(err)
            resolve({
              mobile: this.info.phone,
              nickname: '',
              avatar: ''
            })
          }
        })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  
  loginByAuth(info) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Login.php',
        token: false,
        data: {
          status: "tradeLogin",
          ...info
        }
      }).then((res) => {
        console.log(res)
        require.setToken(res.data.token)
        require.setRefreshToken(res.data.refreshToken)
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  getDataByLocal() {
    if (require.getToken()) {
      this.status.login = true
    }
  }
}

const user = new UserData({
  prop: 'user',
  getData() {
    return new Promise((resolve, reject) => {
      this.$syncPage()
      resolve()
    })
  }
})

user.getDataByLocal()

export default user
