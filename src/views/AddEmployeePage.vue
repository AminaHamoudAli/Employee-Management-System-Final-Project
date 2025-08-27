
<!-- <script>
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
      departments: ['الموارد البشرية', 'المالية', 'التسويق'],
      sidebarOpen: false
    }
  },
  methods: {
    async addEmployee(newEmp) {
      try {
        const res = await fetch("http://localhost/copstone4-mvc3/public/api/v1/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEmp)
        });

        const data = await res.json();
        console.log(data); 

        if (data.error) {
          alert("خطأ: " + data.error);
          return;
        }

        // إعادة توجيه المستخدم بعد الإضافة
        alert(data.message || "تمت إضافة الموظف ");
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء الاتصال بالسيرفر. تأكد أن الباك API يعمل ويعيد JSON صالح.");
      }
    }
  }
}
</script>


<script>
import api from '@/services/api.js'; 

import AddEmployee from '@/components/AddEmployee.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/SideBar.vue';
import ConfirmButton from '@/components/ConfirmButton.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';

export default {
  components: { 
    DarkModeToggle, 
    AddEmployee, 
    Footer, 
    Sidebar, 
    ConfirmButton 
  },
  data() {
    return {
      departments: ['الموارد البشرية', 'المالية', 'التسويق'],
      sidebarOpen: false
    }
  },
  methods: {
    handleEmployeeAddition(employeeData) {
      api.createEmployee(employeeData)         .then(response => {
          if (response.success) {
            alert(response.data.message || "تمت إضافة الموظف بنجاح!");
            this.$router.push('/');
          } else {
            alert("خطأ: " + (response.error || 'فشلت عملية الإضافة.'));
          }
        })
        .catch(err => {
          console.error("Error creating employee:", err);
          let errorMessage = "حدث خطأ أثناء الاتصال بالخادم.";
          if (err.response?.data?.error) {
            errorMessage += \nالرسالة: ${err.response.data.error};
          } else if (err.request) {
            errorMessage += "\nلم يتم تلقي استجابة من الخادم. تأكد أن الباك إند يعمل.";
          }
          alert(errorMessage);
        });
    }
  }
}
</script> -->

<template>
  <div>
    <div dir="rtl" class="font-tajawal text-lg flex flex-col md:flex-row min-h-screen">
      <!-- Sidebar -->
      <Sidebar class="w-full md:w-64 flex-shrink-0" />
      <br><br>

      <!-- المحتوى الرئيسي -->
      <div class="flex-1 flex flex-col">
        <div class="flex flex-col md:flex-row min-h-screen font-cairo" dir="rtl">
          <SideBar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />
          <div
            class="flex-1 p-6 space-y-8 bg-gray-100 transition-all duration-300"
            :class="sidebarOpen ? 'md:mr-64' : 'md:mr-0'">
            
            <div class="bg-[#E0AFFF] p-4 rounded-xl text-center">
              <h1 class="text-3xl font-bold text-white"> نظام ادارة الموظفين</h1>
              <hr class="text-white my-2">
              <h1 class="text-3xl font-bold text-white pr-3.5"> الاحصائـــــيات </h1>
              <b class="pr-3.5">لوحة التحكم</b>
              <b class="font-bold text-white pr-3.5"> الرئيسية </b>
            </div>
            <br>

            <!-- <Navbar /> -->
            <DarkModeToggle />

            <div class="flex-1 p-2">
              <h1 class="text-2xl font-bold text-center mb-4">إضافة موظف جديد</h1>
              <br>
              <AddEmployee :departments="departments" @add-employee="addEmployee" />
              <div class="text-center mt-6">
                <!-- <RouterLink to="/" class="text-blue-600 underline">← الرجوع لقائمة الموظفين</RouterLink> -->
              </div>
            </div>

            <div class="flex justify-center">
              <ConfirmButton />
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import api from '@/services/api.js'; 

import AddEmployee from '@/components/AddEmployee.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/SideBar.vue';
import ConfirmButton from '@/components/ConfirmButton.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';

export default {
  components: { 
    DarkModeToggle, 
    AddEmployee, 
    Footer, 
    Sidebar, 
    ConfirmButton 
  },
  data() {
    return {
      departments: ['الموارد البشرية', 'المالية', 'التسويق'],
      sidebarOpen: false
    }
  },
  methods: {
    handleEmployeeAddition(employeeData) {
      api.createEmployee(employeeData)         .then(response => {
          if (response.success) {
            alert(response.data.message || "تمت إضافة الموظف بنجاح!");
            this.$router.push('/');
          } else {
            alert("خطأ: " + (response.error || 'فشلت عملية الإضافة.'));
          }
        })
        .catch(err => {
          console.error("Error creating employee:", err);
          let errorMessage = "حدث خطأ أثناء الاتصال بالخادم.";
          if (err.response?.data?.error) {
            errorMessage;
            // errorMessage += \nالرسالة: ${err.response.data.error};
          } else if (err.request) {
            errorMessage += "\nلم يتم تلقي استجابة من الخادم. تأكد أن الباك إند يعمل.";
          }
          alert(errorMessage);
        });
    }
}
}
</script>
