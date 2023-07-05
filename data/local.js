const local = {
  data: {},
  setData(prop, value) {
    this.data[prop] = value
  },
  getData(prop) {
    return this.data[prop]
  }
}

export default local
