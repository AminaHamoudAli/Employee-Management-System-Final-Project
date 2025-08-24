
	components: {
		login,
	},
	components: {
		login,
	},
	components: {
		login,
	},
	components: {
		AddEmployee,
	},
	components: {
		Employee,
	},<template>
  <div>
   
    <button @click="menuOpen = !menuOpen" class="focus:outline-none md:hidden p-4">
      <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- القائمة الجانبية -->
    <aside
      :class="[
        'fixed top-0 right-0 h-full w-64 bg-white text-[#C197DB] z-50 transform transition-transform duration-300 md:static md:translate-x-0 md:flex md:flex-col md:w-60 md:min-h-screen',
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <!-- رأس القائمة في الجوال -->
      <div class="flex items-center justify-between p-4 border-b border-white md:hidden">
        <span class="font-bold text-xl">نظام الموظفين</span>
        <!-- زر X -->
        <button @click="menuOpen = false" class="text-white hover:text-gray-300 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
<br>
      <nav class="flex flex-col p-4 space-y-2 flex-grow font-bold">
        <router-link to="/" class="text-black hover:bg-gray-50 hover:text-[#C197DB] cursor-pointer px-4 py-2 rounded font-bold" @click="closeMenu">الصفحة الرئيسية</router-link>
        <br>
        <router-link to="/AddEmployeePage" class="text-black font-bold hover:bg-gray-50 hover:text-[#C197DB] px-4 py-2 rounded" @click="closeMenu">إضافة موظف</router-link>
        <br>
        <router-link to="/salary" class="text-black hover:bg-gray-50 hover:text-[#C197DB] px-4 py-2 rounded" @click="closeMenu">ملخص الرواتب</router-link>
        <br>
        <router-link to="/leaves" class="text-black hover:bg-gray-50 hover:text-[#C197DB] px-4 py-2 rounded" @click="closeMenu">إدارة الإجازات</router-link>
        <br>
        <router-link to="/EmployeeList" class="text-black hover:bg-gray-50 hover:text-[#C197DB] px-4 py-2 rounded" @click="closeMenu">قائمة الموظفين</router-link>
         <br>
        <hr>
    
        <router-link to="/reviews" class="text-black hover:bg-gray-50 hover:text-[#C197DB] px-4 py-2 rounded " @click="closeMenu">الاعدادات
            
        </router-link>
        <router-link to="/login" class="hover:bg-gray-50 text-black hover:text-[#C197DB] px-4 py-2 rounded " @click="closeMenu">تسجيل دخول
            
        </router-link>
      </nav>

      <!-- الإعدادات وتسجيل الخروج -->
      <div class="p-4 border-t border-white space-y-2">
    

        <button class="w-full flex items-center gap-2 px-4 py-2 text-black bg-red-400 hover:bg-red-500 rounded transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"/>
          </svg>
          تسجيل خروج
        </button>

    <!-- <button 
    @click="localStorage.removeItem('isAdmin'); router.push('/login')" 
    class="w-full flex items-center gap-2 px-4 py-2 text-black bg-red-400 hover:bg-red-500 rounded transition"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"/>
    </svg>
    تسجيل خروج
  </button> -->

      </div>
    </aside>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
const router = useRouter()
import Employee from '@/views/Employee.vue'
import AddEmployee from '@/components/AddEmployee.vue'
import login from '@/views/login.vue'

export default {
  name: "Sidebar",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    closeMenu() {
      if (window.innerWidth < 768) {
        this.menuOpen = false;
      }
    },
  },
  watch: {
    $route() {
      this.closeMenu();
    },
  },
};
</script>
