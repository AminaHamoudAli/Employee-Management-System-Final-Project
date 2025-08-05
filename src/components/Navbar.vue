<template>
  <div class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div class="text-xl font-bold text-center text-white bg-[#C197DB] dark:bg-gray-800 pt-3">
      نظام ادارة الموظفين
    </div>

    <nav class="bg-[#C197DB] dark:bg-gray-800 text-white shadow-md px-4 py-3 relative">
      <div class="max-w-7xl mx-auto flex justify-between items-center h-full" dir="rtl">
       
        <button @click="menuOpen = !menuOpen" class="md:hidden text-2xl">
          <i class="ri-menu-line"></i>
        </button>

        <ul class="gap-4 items-center hidden md:flex">
          <li v-for="link in myRoutes" :key="link.name">
            <router-link
              :to="link.path"
          
              class="px-3 py-2 rounded-md hover:bg-gray-50 hover:text-[#C197DB] dark:hover:bg-gray-700 dark:hover:text-white font-medium transition-colors"
            >
              {{ link.meta.title }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- القائمة الجانبية  -->
      <transition name="slide">
        <div
          v-if="menuOpen"
          class="fixed top-0 right-0 h-full w-2/3 bg-[#E0AFFF] dark:bg-gray-800 text-white p-5 z-50 shadow-lg md:hidden"
        >
          <button @click="menuOpen = false" class="text-white text-2xl mb-4 float-left">
            <i class="ri-close-line"></i>
          </button>
          <ul class="flex flex-col gap-4 mt-10">
            <li v-for="link in myRoutes" :key="link.name">
              <router-link
                :to="link.path"
                class="block px-3 py-2 rounded hover:bg-white hover:text-[#E0AFFF] dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                @click="menuOpen = false"
              >
                {{ link.meta.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myRoutes: [],
      menuOpen: false,
    };
  },
  mounted() {
    this.myRoutes = this.$router.options.routes;
  },
};
</script>
