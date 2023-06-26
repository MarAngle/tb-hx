import { getLocal, setLocal, showMsg } from "."

export const data = {
  token: undefined,
  refresh: undefined
}

export const getToken = function() {
  token.data = data
  getLocal('token', data)
}
export const getRefreshToken = function(refreshToken) {
  token.refresh = refreshToken
  getLocal('refreshToken', refreshToken)
}

const require = {
  token: {
    data: undefined,
    refresh: undefined
  },
  setToken(token) {
    this.token.data = token
    setLocal('token', token)
  },
  setRefreshToken(refresh) {
    this.token.refresh = refresh
    setLocal('refresh', refresh)
  },
  getToken() {
    if (!this.token.data) {
      this.token.data = getLocal('token')
    }
    return this.token.data
  },
  getRefreshToken() {
    if (!this.token.refresh) {
      this.token.refresh = getLocal('refresh')
    }
    return this.token.refresh
  },
  require(requireOption) {
    if (!requireOption.data) {
      requireOption.data = {}
    }
    if (!requireOption.headers) {
      requireOption.headers = {}
    }
    if (requireOption.token === true || requireOption.token === undefined) {
      requireOption.headers.token = this.getToken()
    }
    if (requireOption.url.indexOf('http://') !== 0 && requireOption.url.indexOf('https://') !== 0) {
      requireOption.url = 'https://test.ihuanxi.cn' + requireOption.url
      requireOption.$auto = true
    }
    if (requireOption.$fail === undefined) {
      requireOption.$fail = {}
    }
    return new Promise((resolve, reject) => {
      requireOption.success = function(result) {
        const res = result.data
        if (requireOption.$auto) {
          if (res.code == 0) {
            resolve(res)
          } else {
            if (!requireOption.$fail.data) {
              showMsg(res.codemsg || '请求失败且无错误信息！', 'fail')
            }
            reject(res)
          }
        } else {
          resolve(res)
        }
      }
      requireOption.fail = function(err) {
        if (!requireOption.$fail.service) {
          showMsg('服务器请求失败！', 'fail')
        }
        reject(err)
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
