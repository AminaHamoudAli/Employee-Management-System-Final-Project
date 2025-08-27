<template>
  <div class="flex flex-col md:flex-row min-h-screen font-cairo" dir="rtl">
    <!-- Sidebar -->
    <SideBar :isOpen="sidebarOpen" class="w-full md:w-64 flex-shrink-0" @toggle="sidebarOpen = !sidebarOpen" />

    <!-- المحتوى الرئيسي -->
    <div class="flex-1 p-4 md:p-6 space-y-8 bg-gray-100 transition-all duration-300"
         :class="sidebarOpen ? 'md:mr-64' : 'md:mr-0'">
      
      <!-- Header -->
      <div class="bg-[#E0AFFF] p-4 md:p-6 rounded">
        <h1 class="text-2xl md:text-3xl font-bold text-center text-white">نظام ادارة الموظفين</h1>
        <hr class="text-white my-2">
        <h1 class="text-xl md:text-3xl font-bold text-white pr-3.5">الاحصائـــــيات</h1>
        <b class="pr-3.5">لوحة التحكم</b>
        <b class="font-bold text-white pr-3.5">الرئيسية</b>
      </div>

      <!-- إحصائيات -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">عدد الموظفين</h2>
          <p class="text-xl md:text-2xl font-bold text-[#4b2861]">{{ totalEmployees }}</p>
        </div>

        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">سلة المحذوفات</h2>
          <p class="text-xl md:text-2xl font-bold text-red-600">{{ deletedEmployees }}</p>
        </div>

        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">إجمالي الرواتب</h2>
          <p class="text-xl md:text-2xl font-bold text-green-600">{{ totalSalary.toFixed(2) }} ريال</p>
        </div>

        <div class="bg-white p-4 rounded shadow text-center">
          <h2 class="text-gray-500">طلبات الإجازات</h2>
          <p class="text-xl md:text-2xl font-bold text-indigo-600">{{ leaveRequests }}</p>
        </div>
      </div>

      <!-- أحدث الموظفين -->
      <div class="bg-white rounded shadow p-4 overflow-x-auto">
        <h2 class="text-lg md:text-xl font-bold mb-2 text-[#795f8a]">"أحدث الموظفين":</h2>
        <table class="w-full table-auto min-w-max">
          <thead>
            <tr class="bg-[#c0afff] text-right">
              <th class="px-2 md:px-4 py-2">الاسم</th>
              <th class="px-2 md:px-4 py-2">القسم</th>
              <th class="px-2 md:px-4 py-2">الراتب</th>
              <th class="px-2 md:px-4 py-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in latestEmployees" :key="emp.id" class="text-right hover:bg-gray-50">
              <td class="px-2 md:px-4 py-1 md:py-2">{{ emp.name }}</td>
              <td class="px-2 md:px-4 py-1 md:py-2">{{ emp.department }}</td>
              <td class="px-2 md:px-4 py-1 md:py-2">{{ emp.salary }} ريال</td>
              <td class="px-2 md:px-4 py-1 md:py-2">
                <button @click="softDelete(emp.id)" class="bg-yellow-300 text-gray-500 px-2 py-1 rounded text-sm md:text-base">
                  نقل الى سلة المهملات
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- سلة المهملات -->
      <div class="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 class="mb-2 text-lg md:text-xl">🗑️ سلة المهملات</h2>
        <ul v-if="trash.length" class="space-y-1">
          <li v-for="emp in trash" :key="emp.id" class="flex flex-col sm:flex-row sm:justify-between py-1 border-b">
            <span>{{ emp.name }} - {{ emp.department }}</span>
            <div class="mt-1 sm:mt-0">
              <button @click="restore(emp.id)" class="bg-green-500 text-white px-2 py-1 rounded text-sm md:text-base">
                استرجاع
              </button>
            </div>
          </li>
        </ul>
        <div v-else class="text-gray-500">لا يوجد موظفين محذوفين</div>
      </div>

    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import Employee from '@/views/Employee.vue'
import AddEmployee from '@/components/AddEmployee.vue'
import Login from '@/components/Login.vue'

export default {
  components: { Login, SideBar, DarkModeToggle, Employee, AddEmployee },
  name: 'Dashboard',
  data() {
    return {
      employees: JSON.parse(localStorage.getItem('employees')) || [],
      trash: JSON.parse(localStorage.getItem('deletedEmployees')) || [],
      leaveRequests: 0,
      sidebarOpen: false,
    }
  },
  computed: {
    totalEmployees() { return this.employees.length },
    deletedEmployees() { return this.trash.length },
    totalSalary() { return this.employees.reduce((sum, e) => sum + (parseFloat(e.salary)||0), 0) },
    latestEmployees() { return this.employees.slice().reverse().slice(0,5) }
  },
  created() {
    this.employees = JSON.parse(localStorage.getItem('employees')) || []
    this.trash = JSON.parse(localStorage.getItem('deletedEmployees')) || []
    const leaves = JSON.parse(localStorage.getItem('leave-requests')) || []
    this.leaveRequests = leaves.length
  },
  methods: {
    saveData() {
      localStorage.setItem('employees', JSON.stringify(this.employees))
      localStorage.setItem('deletedEmployees', JSON.stringify(this.trash))
    },
    addEmployee(newEmp) { this.employees.push(newEmp); this.saveData() },
    softDelete(id) {
      const index = this.employees.findIndex(e => e.id === id)
      if(index !== -1) {
        const [emp] = this.employees.splice(index,1)
        this.trash.push(emp)
        this.saveData()
      }
    },
    restore(id) {
      const index = this.trash.findIndex(e => e.id === id)
      if(index !== -1) {
        const [emp] = this.trash.splice(index,1)
        this.employees.push(emp)
        this.saveData()
      }
    },
    hardDelete(id) {
      this.trash = this.trash.filter(e => e.id !== id)
      this.saveData()
    }
  }
}
</script>
