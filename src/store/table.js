const state = {
  HotRef: null,
  TableData: [],
  /* 
    buffer_to_table
    table_to_buffer
  */
  DataDirection: null
}

const mutations = {
  INIT_HOTREF(state, data) {
    state.HotRef = data
  },

  SET_TABLE_DATA(state, data) {
    state.TableData = data
  },

  SET_DATA_DIRECTION(state, direction) {
    state.DataDirection = direction
  }
}

const actions = {
  InitHotRef({ commit }, data) {
    commit("INIT_HOTREF", data)
  },

  SetTableData({ commit }, data) {
    commit("SET_DATA_DIRECTION", "buffer_to_table")
    if (data.length === 0) {
      commit("SET_TABLE_DATA", data)
      state.HotRef.loadData([])
      return
    }
    state.HotRef.loadData(data)
    var header = Array(data[0].length + 1).fill("HEADER")
    state.HotRef.updateSettings({
      colHeaders: header
    })
    commit("SET_TABLE_DATA", data)
  }
}

const getters = {
  TableData: state => state.TableData,
  DataDirection: state => state.DataDirection
}

export const table = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
