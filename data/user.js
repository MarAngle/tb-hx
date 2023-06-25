import BaseData from "../class/BaseData";

class UserData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.auth = 'auto'
    this.info = {
      id: 0,
      name: '',
      phone: ''
    }
  }
  autoData() {
    return new Promise((resolve, reject) => {
      my.authorize({
        scopes: 'scope.userInfo',
        success: (res) => {
          console.log(res)
          my.getAuthUserInfo({
            success:(res)=>{
              console.log(res)
              resolve(res)
            },
            fail:(err)=>{
              console.log(err)
              this.auth = 'phone'
              reject(err)
            }
          })
        },
        fail:(err)=>{
          console.log(err)
          this.auth = 'phone'
          reject(err)
        }
      })
    })
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

export default user
