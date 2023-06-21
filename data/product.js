import BaseData from "../class/BaseData";

class ProductData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.list = []
  }
}

const product = new ProductData({
  prop: 'product',
  getData() {
    return new Promise((resolve, reject) => {
      this.list = []
      this.setPage()
      resolve()
    })
  }
})

export default product
