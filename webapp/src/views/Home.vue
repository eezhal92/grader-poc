<template>
  <div class="mx-auto" style="width: 768px">
    <h1 class="mb-6 text-center text-4xl font-bold">Simulate Coding Exercise</h1> 
    <form @submit.prevent="handleSubmit" style="width: 480px; margin: 0 auto" class="bg-white p-8 rounded border">
      <div class="mb-4">
        <label class="block font-bold text-gray-700 mb-1">Select Test ID</label>
        <select class="bg-gray-200 w-full p-2 rounded" :value="testId" @change="handleTestIdChange">
          <option value="find_max">find_max</option>
          <option value="royalrumble">royalrumble</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-bold text-gray-700 mb-1">User</label>
        <select class="bg-gray-200 w-full p-2 rounded" v-model="username">
          <option value="">Choose</option>
          <option v-for="user in availableUsers" :key="user.username" :value="user.username">{{ user.username }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-bold text-gray-700 mb-1">Runtime</label>
        <input class="p-2 w-full" type="text" disabled v-model="runtime">
      </div>

      <div class="text-right">
        <button class="px-4 py-2 bg-green-500 text-white rounded">
          Do the test
        </button>
      </div>
    </form>
  </div>
</template>

<script>
const data = {
  'royalrumble': [
    {
      username: 'alex',
      runtime: 'nodejs',
      testId: 'royalrumble',
    }
  ],
  'find_max': [
    {
      username: 'alex',
      runtime: 'nodejs',
      testId: 'find_max',
    },
    {
      username: 'mark',
      runtime: 'python',
      testId: 'find_max',
    },
    {
      username: 'johndoe',
      runtime: 'golang',
      testId: 'find_max',
    },
  ]
};
export default {
  name: 'Home',
  data () {
    return {
      testId: 'find_max',
      username: '',
    };
  },
  computed: {
    availableUsers () {
      return data[this.testId]
    },
    runtime () {
      const map = {
        alex: 'nodejs',
        mark: 'python',
        johndoe: 'golang',
      }

      return map[this.username];
    }
  },
  methods: {
    handleUsernameChange (e) {
      this.username = e.target.value;
    },
    handleTestIdChange (e) {
      this.testId = e.target.value;
      this.username = '';
    },
    handleSubmit () {
      this.$store.commit('SET_SESSION', {
        username: this.username,
        runtime: this.runtime,
        testId: this.testId
      });
      this.$router.push('/assignment');
    }
  }
}
</script>
