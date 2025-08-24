<!-- <template>
  <div dir="rtl" class="font-tajawal text-lg">
    <Navbar />
    <div class="flex">
   
      <div class="flex-1 p-6">
        <h1 class="text-2xl font-bold text-center mb-4">إضافة موظف جديد</h1>
        <br>

        <AddEmployee :departments="departments" @add-employee="addEmployee" />

        <div class="text-center mt-6">
         
        </div>
      </div>
    </div>
    <div class="  flex items-center justify-center">
        <ConfirmButton/>
    </div>
    <br>
    <Footer />
  </div>
</template> -->

<!-- <script>
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
</script> -->
<template>
  <div dir="rtl" class="font-tajawal text-lg">
    <Navbar />

    <DarkModeToggle />
   
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
    <div class="flex items-center justify-center">
      <ConfirmButton />
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
import DarkModeToggle from '@/components/DarkModeToggle.vue'

export default {
  components: { DarkModeToggle, Navbar, AddEmployee, Footer, Sidebar, ConfirmButton },
  data() {
    return {
      departments: ['الموارد البشرية', 'المالية', 'التسويق'] 
    }
  },
  methods: {
    async addEmployee(newEmp) {
      try {
        // const res = await fetch("http://localhost/capstone4-mvc1/Employee.php", {
          const res = await fetch("http://localhost/capstone4-mvc1/app/controllers/EmployeeController.php", {
        // const res = await fetch("http://localhost/capstone4-mvc1/Employee.store", {
          method: "POST",
          headers: { "Content-Type": "application/json" },

// header: {"Content-Type": "application/json"; "charset=UTF-8"},

          body: JSON.stringify(newEmp)
        });

        const data = await res.json();
        console.log(data); 

        if (data.error) {
          alert("خطأ: " + data.error);
          return;
        }

        alert(data.message || "تمت إضافة الموظف ");
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء الاتصال بالسيرفر ");
      }
    }
  }
}
</script>
