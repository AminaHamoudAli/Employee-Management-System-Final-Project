<template>
  <Navbar/>
  <div dir="rtl" class=" mx-auto  rounded shadow">
    <div class=" mx-auto rounded shadow mr-12 pr-11 ">
  <div class="bg-white flex items-center justify-center">
    <h2 class="text-xl font-semibold mb-2 pt-3.5 pb-5">تفاصيل الموظف</h2>
  </div>
    
      <br>
      <br>

      <div v-if="employee">
        <!-- تفاصيل الموظف -->
        <section class="mb-4">
          <p><strong>الاسم:</strong> {{ employee.name }}</p>
          <p><strong>القسم:</strong> {{ employee.department }}</p>
          <p><strong>نوع العقد:</strong> {{ employee.contract }}</p>

      
        </section>
        <hr>

        <!-- الراتب -->
        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-2">الراتب</h2>
          <p><strong>الراتب الأساسي:</strong> {{ employee.salary || '-' }} ريال</p>
          <p><strong>المكافأة ({{ bonusPercentDisplay }}):</strong> {{ bonusAmount }} ريال</p>
          <p><strong>الخصم ({{ deductionPercentDisplay }}):</strong> {{ deductionAmount }} ريال</p>
          <p><strong>الراتب الكلي:</strong> {{ totalSalary }} ريال</p>
        </section>
        <hr>

          <!--  زر الحذف -->
          <div class="mt-4">
            <EmployeeActions
              :employeeId="employee.id"
              :inTrash="false"
              @soft-delete="softDelete"
              @hard-delete="hardDelete"
            />
          </div>
          <br><br>

        <!-- زر الرجوع -->
        <div class="text-center">
         
          <ConfirmButton/>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center bg-white p-6 rounded shadow-md space-y-4">
  <p class="text-lg text-red-600 font-semibold">الموظف غير موجود</p>
  <br><br>
  
 
  <ConfirmButton/>
  <br>
</div>
<br>
    </div>
  </div>
  <Footer/>
</template>

<script>
import EmployeeActions from '@/components/EmployeeActions.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'
// import ConfirmButton from '@/components/ConfirmButton.vue'

export default {
  name: 'ProfilePage',
  components: {
    EmployeeActions,
    Navbar,
  	Footer,
		ConfirmButton,
	},
  data() {
    return {
      employee: null,
      evaluationNotes: [],
      leaves: [],
    }
  },
  created() {
    const id = this.$route.params.id
    const employees = JSON.parse(localStorage.getItem('employees')) || []
    this.employee = employees.find(emp => emp.id == id) || null

    if (this.employee) {
      this.evaluationNotes = [
        'أداء ممتاز في الربع الأخير',
        'يتعاون بشكل جيد مع الفريق'
      ]
      const allLeaves = JSON.parse(localStorage.getItem('leaves')) || []
      this.leaves = allLeaves.filter(leave => leave.employeeId == id)
    }
  },
  computed: {
    bonusPercent() {
      return this.employee?.bonusPercent ?? null
    },
    deductionPercent() {
      return this.employee?.deductionPercent ?? null
    },
    bonusPercentDisplay() {
      return this.bonusPercent !== null ? this.bonusPercent + '%' : '-'
    },
    deductionPercentDisplay() {
      return this.deductionPercent !== null ? this.deductionPercent + '%' : '-'
    },
    bonusAmount() {
      return this.employee && this.bonusPercent !== null
        ? (this.employee.salary * this.bonusPercent) / 100
        : 0
    },
    deductionAmount() {
      return this.employee && this.deductionPercent !== null
        ? (this.employee.salary * this.deductionPercent) / 100
        : 0
    },
    totalSalary() {
      if (!this.employee) return 0
      return this.employee.salary + this.bonusAmount - this.deductionAmount
    }
  },
  methods: {
    softDelete(id) {
      const employees = JSON.parse(localStorage.getItem('employees')) || []
      const index = employees.findIndex(emp => emp.id == id)
      if (index !== -1) {
        const [removed] = employees.splice(index, 1)
        const trash = JSON.parse(localStorage.getItem('trash')) || []
        trash.push(removed)
        localStorage.setItem('employees', JSON.stringify(employees))
        localStorage.setItem('trash', JSON.stringify(trash))
        alert('تم الحذف المؤقت بنجاح')
        this.$router.push('/')
      }
    },
    hardDelete(id) {
      const employees = JSON.parse(localStorage.getItem('employees')) || []
      const index = employees.findIndex(emp => emp.id == id)
      if (index !== -1) {
        employees.splice(index, 1)
        localStorage.setItem('employees', JSON.stringify(employees))
        alert('تم الحذف النهائي بنجاح')
        this.$router.push('/')
      }
    }
  }
}
</script>
