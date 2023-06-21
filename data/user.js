import BaseData from "../class/BaseData";

class UserData extends BaseData{
  constructor(initOption) {
    super(initOption)
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
      this.data.list = []
      this.setPage()
      resolve()
    })
  }
})

export default user
