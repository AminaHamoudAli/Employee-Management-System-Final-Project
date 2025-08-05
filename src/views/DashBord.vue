<template>
  <div class="flex min-h-screen font-cairo" dir="rtl">
    
    <SideBar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />
    <div
      class="flex-1 p-6 space-y-8 bg-gray-100 transition-all duration-300"
      :class="sidebarOpen ? 'mr-64' : 'mr-0'" >
      <div class=" bg-[#E0AFFF] ">
        <br>
          <h1 class="text-3xl font-bold text-center text-white"> نظام ادارة الموظفين</h1>
          <DarkModeToggle/>
          <br>
          <hr class="text-white">
          <h1 class="text-3xl font-bold text-white pr-3.5 "> الاحصائـــــيات </h1>
          <br>
          <b class="pr-3.5">لوحة التحكم  </b>
          <b class="font-bold text-white pr-3.5">   الرئيسية </b>
          <br>
          <br>
      </div>
      <br>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">عدد الموظفين</h2>
          <p class="text-2xl font-bold text-[#4b2861]">{{ totalEmployees }}</p>
        </div>
      
        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">سلة المحذوفات</h2>
          <p class="text-2xl font-bold text-red-600">{{ deletedEmployees }}</p>
        </div>
        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">إجمالي الرواتب</h2>
          <p class="text-2xl font-bold text-green-600">{{ totalSalary.toFixed(2) }} ريال</p>
        </div>
        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">طلبات الإجازات</h2>
          <p class="text-2xl font-bold text-indigo-600">{{ leaveRequests }}</p>
        </div>
      </div>
<br><br>
    
      <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link to="/AddEmployeePage" class="bg-blue-400 hover:bg-blue-300 text-white text-center py-3 rounded font-semibold">➕ إضافة موظف</router-link>
        <router-link to="/EmployeeList" class="bg-green-400 hover:bg-green-300 text-white text-center py-3 rounded font-semibold">👥 عرض الموظفين</router-link>
        <router-link to="/leaves" class="bg-yellow-400 hover:bg-yellow-300 text-white text-center py-3 rounded font-semibold">🌴 إدارة الإجازات</router-link>
      </div> -->
<br>
<br>
      <!-- آخر الموظفين -->
      <div class="bg-white rounded shadow p-4">
        <h2 class="text-xl font-bold mb-4 text-[#795f8a]">"أحدث الموظفين":</h2>
        <br>
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-[#c0afff] text-right">
              <th class="px-4 py-2">الاسم</th>
              <th class="px-4 py-2">القسم</th>
              <th class="px-4 py-2">الراتب</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in latestEmployees" :key="emp.id" class="text-right hover:bg-gray-50">
              <td class="px-4 py-2">{{ emp.name }}</td>
              <td class="px-4 py-2">{{ emp.department }}</td>
              <td class="px-4 py-2">{{ emp.salary }} ريال</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import Employee from '@/views/Employee.vue'
import AddEmployee from '@/components/AddEmployee.vue'

export default {
  components: {
     SideBar ,
    	DarkModeToggle,
		Employee,
		AddEmployee,
	},
  name: 'Dashboard',
  data() {
    return {
      employees: [],
      deletedEmployees: 0,
      leaveRequests: 0,
      sidebarOpen: false,  // الحالة المفتوحة أو المغلقة للسايدبار
    }
  },
  computed: {
    totalEmployees() {
      return this.employees.length;
    },
    totalSalary() {
      return this.employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    },
    latestEmployees() {
      return this.employees.slice().reverse().slice(0, 5);
    }
  },
  created() {
    const saved = JSON.parse(localStorage.getItem('employees')) || [];
    const deleted = JSON.parse(localStorage.getItem('deletedEmployees')) || [];
    const leaves = JSON.parse(localStorage.getItem('leaveRequests')) || [];

    this.employees = saved;
    this.deletedEmployees = deleted.length;
    this.leaveRequests = leaves.length;
  }
}
</script>
