import ProductList from './class/ProductList'

const productList = new ProductList({
  prop: 'productList',
  service: {
    url: 'https://ihuanxi.cn'
  }
})

export default productList
