import ProductList from './class/ProductList'

const hotProduct = new ProductList({
  prop: 'hotProduct',
  service: {
    url: 'https://ihuanxi.cn'
  }
})

export default hotProduct
