import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

// Fetch the saved board from localstorage or use the default board
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id == id) {
              return task
            }
          }
        }
      } 
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid()
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      Vue.set(task, key, value)
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIdx, toTaskIdx }) {
      const taskToMove = fromTasks.splice(fromTaskIdx, 1)[0]
      toTasks.splice(toTaskIdx, 0, taskToMove)
    },
    MOVE_COLUMN(state, { fromColumnIdx, toColumnIdx }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIdx, 1)[0]
      columnList.splice(toColumnIdx, 0, columnToMove);
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({ name, tasks: [] })
    }
  }
})
