<template>
  <div dir="rtl" class="font-tajawal text-lg">
    <Navbar />
    <div class="flex">
      <!-- محتوى الصفحة -->
      <div class="flex-1 p-6">
        <h1 class="text-2xl font-bold text-center mb-4">إضافة موظف جديد</h1>
        <br>

        <AddEmployee :departments="departments" @add-employee="addEmployee" />

        <div class="text-center mt-6">
          <!-- <RouterLink to="/" class="text-blue-600 underline">← الرجوع لقائمة الموظفين</RouterLink> -->
        </div>
      </div>
    </div>
    <div class="  flex items-center justify-center">
        <ConfirmButton/>
    </div>
    <br>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AddEmployee from '@/components/AddEmployee.vue'
import Footer from '@/components/Footer.vue'
import Sidebar from '@/components/SideBar.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'

export default {
  components: { Navbar, AddEmployee, Footer , Sidebar,	ConfirmButton,
	},
  data() {
    return {
      departments: ['الموارد البشرية', 'المالية', 'التسويق'] 
    }
  },
  methods: {
    addEmployee(newEmp) {
      const stored = localStorage.getItem('employees')
      const employees = stored ? JSON.parse(stored) : []

      newEmp.id = Date.now()
      newEmp.deleted = false
      employees.push(newEmp)

      localStorage.setItem('employees', JSON.stringify(employees))

      this.$router.push('/')
    }
  }
}
</script>
