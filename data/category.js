import BaseData from "../class/BaseData";
import require from "../utils/require";

class CategoryData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = {
      left: {
        name: '衣鞋洗护专区',
        id: 1,
        icon: ''
      },
      rightTop: {
        name: '家纺专区',
        id: 2,
        icon: ''
      },
      rightBottom: {
        name: '奢护专区',
        id: 3,
        icon: ''
      }
    }
  }
}

const category = new CategoryData({
  prop: 'category',
  getData() {
    return new Promise((resolve, reject) => {
      require.get({
        url: 'https://ihuanxi.cn',
        headers: {},
        data: {},
        timeout: 0,
        dataType: '',
        token: false
      }).then(res => {
        console.log(this)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})

export default category
