<template>
  <div class="mx-auto" style="width: 768px">
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-1">Username</label>
        <select @change="handleUsernameChange">
          <option value="mark">mark</option>
          <option selected value="alex">alex</option>
          <option value="johndoe">johndoe</option>
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
export default {
  name: 'Home',
  data () {
    return {
      runtime: 'nodejs',
      username: 'alex' 
    };
  },
  computed: {
    // runtime () {
    //   const map = {
    //     alex: 'nodejs',
    //     mark: 'python',
    //     johndoe: 'golang',
    //   }

    //   return map[this.username];
    // }
  },
  methods: {
    handleUsernameChange (e) {
      this.username = e.target.value;
    },
    handleSubmit () {
      this.$store.commit('SET_SESSION', {
        username: this.username,
        runtime: this.runtime,
        testId: 'royalrumble'
      });
      this.$router.push('/assignment');
    }
  }
}
</script>
