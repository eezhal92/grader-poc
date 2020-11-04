<template>
  <div style="width: 786px;" class="container mx-auto">
    <h1 class="mb-8 text-3xl font-bold">Job Openings</h1>

    <div>
      <div v-for="opening in openings" :key="opening.id" class="mb-6 rounded border p-4 shadow bg-white cursor">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <h2 class="font-bold text-xl mb-2">{{ opening.role }}</h2>
            <p class="text-gray-600 text-sm">Test Difficulty</p>
            <p class="text-gray-700">{{ opening.difficulty }}</p>
          </div>
          <div class="">
            <button @click="handleClick(opening.id)" class="px-4 py-2 rounded text-xl bg-green-500 text-white">Apply</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['openings']),
  },
  methods: {
    handleClick (id) {
      const confirmed = confirm('Are you sure want to apply to position: Frontend Engineer');
      if (!confirmed) return;
      this.$router.push(`/openings/${id}`);
    }
  }
}
</script>