import { ruleData, showMsg } from "../../utils/index"
import { createLifePage } from "../../utils/page"
import requireS from "../../utils/require"
import user from "./../../data/user"

Page(createLifePage({
  data: {
    form: {
      phone: '',
      code: ''
    },
    code: {
      ing: false,
      operate: false,
      count: 60
    }
  },
  getCode() {
    if (!this.checkForm(true)) {
      this.data.code.ing = true
      this.setData({
        code: this.data.code
      })
      requireS.post({
        url: '/washService/loginAction.php',
        token: false,
        data: {
          scene: "H5",
          status: "getCode",
          mobile: this.data.form.phone
        }
      }).then(() => {
        this.data.code.ing = false
        this.data.code.operate = true
        this.startCount()
        this.setData({
          code: this.data.code
        })
      }).catch(err => {
        console.error(err)
        this.data.code.ing = false
        this.setData({
          code: this.data.code
        })
      })
    }
  },
  checkForm(unCode) {
    if (ruleData.mobile.test(this.data.form.phone)) {
      if (unCode || this.data.form.code.length >= 4) {
        return false
      } else {
        showMsg('请输入验证码！', 'fail')
        return true
      }
    } else {
      showMsg('请正确输入手机号！', 'fail')
      return true
    }
  },
  onLogin() {
    if (!this.checkForm()) {
      user.$triggerMethod('$loginByPhone', [this.data.form], true)
    }
  },
  onFormChange(e) {
    const prop = e.target.dataset.prop
    this.data.form[prop] = e.detail.value
    this.setData({
      form: this.data.form
    })
  }
}, {
  show() {
    // this.data.form.phone = ''
    // this.data.form.code = ''
    // this.data.code.ing = false
    // this.data.code.operate = false
    // this.data.code.count = 60
    // this.setData({
    //   form: this.data.form,
    //   code: this.data.code
    // })
  }
}))
