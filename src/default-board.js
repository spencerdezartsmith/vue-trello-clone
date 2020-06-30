import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
