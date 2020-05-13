<template>
  <div class="mx-auto" style="width: 768px">
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-1">Choose Test</label>
        <select :value="testId" @change="handleTestIdChange">
          <option value="find_max">find_max</option>
          <option value="royalrumble">royalrumble</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Username</label>
        <select v-model="username">
          <option value="">Choose</option>
          <option v-for="user in availableUsers" :key="user.username" :value="user.username">{{ user.username }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Runtime</label>
        <input type="text" disabled v-model="runtime">
      </div>

      <div class="mb-4">
        <label class="block mb-1">Test ID</label>
        <input type="text" disabled value="find_max">  
      </div>

      <button class="p-2 bg-green-500 text-white">
        Do the test
      </button>
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
