
const require = {
  require(requireOption) {
    if (!requireOption.data) {
      requireOption.data = {}
    }
    if (requireOption.token === true || requireOption.token === undefined) {
      requireOption.data.token = 'token'
    }
    return new Promise((resolve, reject) => {
      requireOption.success = function(result) {
        resolve(result)
      }
      requireOption.fail = function(err) {
        resolve(err)
      }
      my.request(requireOption)
    })
  },
  get(requireOption) {
    requireOption.method = 'get'
    return this.require(requireOption)
  },
  post(requireOption) {
    requireOption.method = 'post'
    return this.require(requireOption)
  }
}

export default require
