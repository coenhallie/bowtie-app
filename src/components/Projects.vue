<template>
  <div class="projects px-4 flex justify-center">
    <div>
      <button @click="emit('selectProject', 'project1')">Project 1</button> |
      <button @click="emit('selectProject', 'project2')">Project 2</button>
    </div>
    <div>
      <button
        @click="addNewProject"
        class="bg-white text-gray-800 rounded px-4 mx-4"
      >
        New Project
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  setup(props, { emit }) {
    const addNewProject = () => {
      axios
        .post(`http://localhost:3000/project3`, {
          threats: [
            {
              id: Math.random(),
              threatName: 'test',
              threatDescription: 'test3',
              threatLevel: 'High',
              barriers: [],
            },
          ],
        })
        .then(function () {
          console.log('yay')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    return {
      emit,
      addNewProject,
    }
  }
}
</script>

<style>
.projects {
  padding: 16px 0 16px 0;
  background: #1a2b6b;
  color: white;
}
</style>
