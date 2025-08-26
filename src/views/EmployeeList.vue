<template>
  <div dir="rtl" class="font-tajawal text-lg flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar class="w-64" />
    
    <!-- المحتوى الرئيسي -->
    <div class="flex-1 flex flex-col p-6 bg-gray-100 transition-all duration-300">
      <div class="bg-[#E0AFFF] p-4">
        <h1 class="text-3xl font-bold text-center text-white">نظام إدارة الموظفين</h1>
        <hr class="text-white my-2">
        <h1 class="text-3xl font-bold text-white">الإحصائيات</h1>
        <b>لوحة التحكم</b>
        <b class="font-bold text-white">الرئيسية</b>
      </div>

      <DarkModeToggle />

      <!-- المحتوى -->
      <div class="flex-1 p-6">
        <h1 class="text-2xl font-bold text-center mb-4">قائمة الموظفين</h1>
         <br>
        
        <div class="mb-4 text-center">
          <RouterLink to="/AddEmployeePage" class="bg-[#e0afff] text-white px-4 py-2 rounded hover:bg-[#c0afff]">
            ➕ إضافة موظف جديد
          </RouterLink>
        </div>
        <br>

        <EmployeeFilters v-model="filters" :departments="uniqueDepartments" />

        <EmployeeTable
          :employees="filteredEmployees"
          @soft-delete="softDelete"
          @hard-delete="hardDelete"
        />

        <div class="flex justify-center mb-6">
          <ConfirmButton />
        </div>
      </div>
    </div>
    
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import EmployeeFilters from '@/components/EmployeeFilters.vue'
import EmployeeTable from '@/components/EmployeeTable.vue'
import Footer from '@/components/Footer.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'
import Sidebar from '@/components/SideBar.vue'
import AddEmployee from '@/components/AddEmployee.vue'

export default {
  components: { Navbar, EmployeeFilters, EmployeeTable, Footer, ConfirmButton, Sidebar, AddEmployee },
  data() {
    return {
      filters: { search: '', department: '', evaluation: '' },
      employees: []
    }
  },
  computed: {
    uniqueDepartments() {
      return [...new Set(this.employees.map((e) => e.department))]
    },
    filteredEmployees() {
      const search = this.filters.search.trim().toLowerCase()
      return this.employees.filter(emp => {
        if (emp.deleted) return false
        const name = emp.name.toLowerCase()
        return (
          (search === '' || name.includes(search)) &&
          (this.filters.department === '' || emp.department === this.filters.department) &&
          (this.filters.evaluation === '' || emp.evaluation === this.filters.evaluation)
        )
      })
    }
  },
  methods: {
    softDelete(id) {
      const emp = this.employees.find(e => e.id === id)
      if (emp) emp.deleted = true
      this.updateLocalStorage()
    },
    hardDelete(id) {
      this.employees = this.employees.filter(e => e.id !== id)
      this.updateLocalStorage()
    },
    updateLocalStorage() {
      localStorage.setItem('employees', JSON.stringify(this.employees))
    }
  },
  mounted() {
    const stored = localStorage.getItem('employees')
    this.employees = stored ? JSON.parse(stored) : []
  }
}
</script>