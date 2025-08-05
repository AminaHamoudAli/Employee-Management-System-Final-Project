<template>
  <footer class="bg-[#4B2861] text-white py-8 w-full mt-auto">
    <div class="w-full px-4 flex flex-col items-center justify-center gap-8 text-center">
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-bold">نظام إدارة الموظفين</h2>
        <br>
        <p class="text-sm mt-1">© 2025 جميع الحقوق محفوظة</p>
      </div>

      <!-- Navigation Links -->
      <nav>
        <ul class="flex flex-col md:flex-row gap-2 md:gap-6 justify-center">
          <li><router-link to="/" class="hover:text-gray-400">الرئيسية</router-link></li>
          <li><router-link to="/employees" class="hover:text-gray-400"> Twitter</router-link></li>
          <li><router-link to="/add" class="hover:text-gray-400"> Facebook</router-link></li>
          <li><router-link to="/trash" class="hover:text-gray-400">LinkedIn </router-link></li>
        </ul>
      </nav>

      <!-- Social Icons -->
      <div class="">
        <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="hover:text-gray-400">
          <i class="fab fa-twitter fa-lg"></i>
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="hover:text-gray-400">
          <i class="fab fa-facebook-f fa-lg"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" class="hover:text-gray-400">
          <i class="fab fa-linkedin-in fa-lg"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>

</script>
