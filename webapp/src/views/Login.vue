<template>
  <div>
    <h1 class="text-center mb-4 font-bold text-2xl">Login</h1>
    <form style="width:320px;" class="mx-auto border rounded p-4" @submit.prevent="$router.push('/openings')">
      <div class="mb-2">
        <label for="" class="block mb-2 font-bold">Email</label>
        <input value="mark@gmail.com" type="email" class="px-4 w-full py-2 bg-gray-200 rounded">
      </div>
      <div class="mb-6">
        <label for="" class="block mb-2 font-bold">Password</label>
        <input value="mark@gmail.com" type="password" class="px-4 w-full py-2 bg-gray-200 rounded">
      </div>
      <button class="w-full bg-green-500 text-white rounded py-2">
        Login
      </button>
    </form>
  </div>
</template>