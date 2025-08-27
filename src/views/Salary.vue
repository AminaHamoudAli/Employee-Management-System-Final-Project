<template>
  <div dir="rtl" class="font-tajawal text-lg flex flex-col md:flex-row min-h-screen">
    <!-- Sidebar -->
    <!-- <SideBar class="w-64" /> -->
    <div class="flex-1">
      <div class="flex flex-col md:flex-row min-h-screen font-cairo" dir="rtl">
    
        <SideBar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" class="flex-shrink-0 md:w-64" />

        <div
          class="flex-1 p-4 md:p-6 space-y-8 bg-gray-100 transition-all duration-300"
          :class="sidebarOpen ? 'md:mr-64' : 'md:mr-0'" >
          
          <div class=" bg-[#E0AFFF] p-4 md:p-6 rounded">
            <h1 class="text-2xl md:text-3xl font-bold text-center text-white"> نظام ادارة الموظفين</h1>
            <hr class="text-white my-2">
            <h1 class="text-xl md:text-3xl font-bold text-white pr-3.5 "> الاحصائـــــيات </h1>
            <b class="pr-3.5">لوحة التحكم  </b>
            <b class="font-bold text-white pr-3.5">   الرئيسية </b>
          </div>

          <!-- ملخص الرواتب -->
          <div class="p-4 md:p-6 bg-white rounded shadow overflow-x-auto" dir="rtl">
            <h1 class="text-2xl md:text-3xl font-bold mb-4 p-2 flex items-center justify-center">ملخص الرواتب</h1>
            <table class="w-full table-auto border-collapse min-w-[600px] md:min-w-[800px]">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border px-2 md:px-4 py-1 md:py-2">الاسم</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">القسم</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">الراتب الأساسي</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">نسبة المكافأة (%)</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">نسبة الخصم (%)</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">المكافأة</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">الخصم</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">الراتب الكلي</th>
                  <th class="border px-2 md:px-4 py-1 md:py-2">عرض</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="emp in employees" :key="emp.id" class="text-center">
                  <td class="border px-2 md:px-4 py-1 md:py-2">{{ emp.name }}</td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">{{ emp.department }}</td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">{{ emp.salary }} ريال</td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">
                    <input
                      type="number"
                      v-model.number="emp.bonusPercent"
                      @input="updateTotalSalary(emp)"
                      class="border px-2 py-1 w-16 md:w-20 rounded text-center"
                      placeholder="0"
                      min="0"
                    />
                  </td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">
                    <input
                      type="number"
                      v-model.number="emp.deductionPercent"
                      @input="updateTotalSalary(emp)"
                      class="border px-2 py-1 w-16 md:w-20 rounded text-center"
                      placeholder="0"
                      min="0"
                    />
                  </td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">{{ emp.bonus.toFixed(2) }} ريال</td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">{{ emp.deduction.toFixed(2) }} ريال</td>
                  <td class="border px-2 md:px-4 py-1 md:py-2 font-semibold">{{ emp.totalSalary.toFixed(2) }} ريال</td>
                  <td class="border px-2 md:px-4 py-1 md:py-2">
                    <button
                      @click="$router.push(`/profile/${emp.id}`)"
                      class="bg-[#c197db] hover:bg-[#E0AFFF] text-white px-2 md:px-3 py-1 rounded text-sm md:text-base"
                    >
                      التفاصيل
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mt-4 md:mt-6 text-center">
              <ConfirmButton />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import SideBar from '@/components/SideBar.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'

export default {
  name: 'SalaryPage',
  data() {
    return {
      employees: []
    }
  },
  components: {
    Navbar,
    ConfirmButton,
    SideBar
  },
  created() {
    const saved = JSON.parse(localStorage.getItem('employees')) || []

    this.employees = saved.map(emp => {
      const bonusPercent = emp.bonusPercent || 0
      const deductionPercent = emp.deductionPercent || 0
      const bonus = (emp.salary * bonusPercent) / 100
      const deduction = (emp.salary * deductionPercent) / 100
      const totalSalary = emp.salary + bonus - deduction

      return {
        ...emp,
        bonusPercent,
        deductionPercent,
        bonus,
        deduction,
        totalSalary
      }
    })
  },
  methods: {
    updateTotalSalary(emp) {
      emp.bonus = (emp.salary * emp.bonusPercent) / 100
      emp.deduction = (emp.salary * emp.deductionPercent) / 100
      emp.totalSalary = emp.salary + emp.bonus - emp.deduction

      const allEmployees = JSON.parse(localStorage.getItem('employees')) || []
      const updatedEmployees = allEmployees.map(e =>
        e.id === emp.id
          ? {
              ...e,
              bonusPercent: emp.bonusPercent,
              deductionPercent: emp.deductionPercent
            }
          : e
      )
      localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    }
  }
}
</script>
