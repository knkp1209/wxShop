import * as types from './mutation-types'
const matations = {
  /**
   * state:当前状态树
   * v: 提交matations时传的参数
   */
  [types.SET_TOKEN](state, v) {
    state.token = v;
  },
  [types.SET_USER_INFO](state, obj) {
    state.userInfo = obj;
  },
  [types.SET_ADDRESS](state, obj) {
    state.address = obj;
  },
  [types.SET_ADDRESS_LIST](state, arr) {
    state.addressList = arr
  },
}

export default matations
