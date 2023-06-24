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
