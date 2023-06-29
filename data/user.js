import BaseData from "../class/BaseData";
import { getLocal, rule, showMsg } from "../utils";
import require from "../utils/require";

class UserData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.status.login = false
    this.status.type = 'auth'
    this.info = {
      accessToken: undefined,
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
  auth() {
    return new Promise((resolve, reject) => {
      my.authorize({
        scopes: ['scope.userInfo', 'scope.addressList', 'scope.getPhoneNumber'],
        success: (res) => {
          console.log(res)
          this.accessToken = res.accessToken
          this.getPhoneNumber().then(() => {
            this.status.login = true
            my.getAuthUserInfo({
              success:(res)=>{
                console.log(res)
                this.$syncPage()
                resolve(res)
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
        },
        fail:(err)=>{
          console.log(err)
          this.status.type = 'phone'
          this.$syncPage()
          reject(err)
        }
      })
    })
  }
  getPhoneNumber() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Login.php',
        token: false,
        data: {
          status: "userPhoneGet",
          sessionKey: this.info.accessToken
        }
      }).then((res) => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  getDataByLocal() {

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
