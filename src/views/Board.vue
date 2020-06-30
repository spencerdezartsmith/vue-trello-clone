<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div 
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        draggable
        @dragstart.self="pickupColumn($event, $columnIndex)"
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent>
        <div class="flex items-center mb-4 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div class="task" 
            v-for="(task, $taskIndex) of column.tasks" 
            :key="$taskIndex"
            draggable
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
            @dragover.prevent
            @dragenter.prevent
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)">
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
              {{ task.description }}
            </p>
          </div>
        </div>
        <input
          class="block p-2 w-full bg-transparent"
          type="text"
          placeholder="Enter new task"
          @keyup.enter="createTask($event, column.tasks)">
      </div>
    </div>
    <!-- Self only applies the click to the target not the children -->
    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close">
      <!-- Nested router -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push(`/task/${task.id}`)
    },
    close() {
      this.$router.push('/')
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
      e.target.value = ''
    },
    pickupTask(e, taskIdx, fromColumnIdx) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIdx)
      e.dataTransfer.setData('from-column-index', fromColumnIdx)
      e.dataTransfer.setData('type', 'task')
    },
    pickupColumn(e, fromColumnIdx) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIdx)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn(e, toTasks, toColumnIdx, toTaskIdx) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIdx !== undefined ? toTaskIdx : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIdx)
      }
    },
    moveTask(e, toTasks, toTaskIdx) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIdx = e.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIdx,
        toTaskIdx
      })
    },
    moveColumn(e, toColumnIdx) {
      const fromColumnIdx = e.dataTransfer.getData('from-column-index')

      this.$store.commit('MOVE_COLUMN', {
        fromColumnIdx,
        toColumnIdx
      })
    },
  }
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
