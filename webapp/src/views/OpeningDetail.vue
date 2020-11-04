<template>
  <div style="width: 768px" class="mx-auto px-6 pb-12">
    <div class="mb-8">
      <h1 class="mb-2 font-bold text-4xl">Apply Frontend Engineer</h1>
      <p class="text-gray-700">Location: Remote</p>
    </div>


    <div>
      <div class="mb-8">
        <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus a eum esse maxime quidem at vel ea numquam tempora necessitatibus fuga quae assumenda laudantium, sint quis sunt minima sed voluptatem.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-bold">Qualifications</h2>
        <ul class="pl-4 list-disc">
          <li>Have at least 3 years of engineering experience with proven management wins</li>
          <li>Successful track record of developing quality software products and shipping production-ready software</li>
          <li>JavaScript and ReactJS expertise and have strong knowledge of state management such as redux</li>
        </ul>
      </div>
      

      <h2 class="text-xl mb-4 font-bold">Tests</h2>
      <table class="w-full"> 
        <thead>
          <tr>
            <th class="border-b-2 p-2">Question</th>
            <th class="border-b-2 p-2">Environment</th>
            <th class="border-b-2 p-2">Difficulty</th>
            <th class="border-b-2 p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b p-2">1</td>
            <td class="border-b p-2">HTML, CSS, React JS</td>
            <td class="border-b p-2">Easy</td>
            <td class="border-b p-2">
              <button @click="goToTest(1)" class="px-4 py-2 rounded bg-green-500 text-white">Take Test</button>
            </td>
          </tr>
          <tr>
            <td class="p-2">2</td>
            <td class="p-2">NodeJS</td>
            <td class="p-2">Medium</td>
            <td class="p-2">
              <button @click="goToTest(2)" class="px-4 py-2 rounded bg-green-500 text-white">Take Test</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToTest(number) {
      switch (number) {
        case 1:
          this.$router.push('/fe-test');
          break;
        case 2:
          this.$router.push('/assignment');
          break;
        default:
          return null;
      }
    }
  }
}
</script>