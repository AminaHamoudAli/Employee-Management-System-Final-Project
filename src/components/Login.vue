<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">تسجيل دخول</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1">اسم المستخدم</label>
          <input v-model="username" type="text" class="w-full p-2 border rounded" required />
        </div>
        <div>
          <label class="block mb-1">كلمة المرور</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded" required />
        </div>
        <button type="submit" class="w-full bg-[#C197DB] text-white py-2 rounded hover:bg-[#C197DB]">
        دخول
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter() // 1. استدعاء الـ Router

const username = ref('')
const password = ref('')
const errorMessage = ref('')

// بيانات المشرف
const ADMIN_CREDENTIALS = { username: 'amina', password: '12345' }

const handleLogin = () => {
  if (username.value === ADMIN_CREDENTIALS.username && password.value === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('isAdmin', 'true')
    router.push('/') // 2. التنقل للداش بورد
  } else {
    errorMessage.value = 'اسم المستخدم أو كلمة المرور غير صحيحة'
    username.value = ''
    password.value = ''
  }
}
</script>
