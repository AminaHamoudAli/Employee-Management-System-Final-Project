<template>
    <Navbar />
    <diV dir="rtl">
  <div dir="rtl" class=" p-12  mx-auto">
   <div class="text-center my-6 bg-gray-100">
    <br>
  <h1 class="text-3xl md:text-4xl font-bold text-black tracking-wide border-b-4 border-[#4b2861] inline-block pb-2">
    إدارة الإجازات
  </h1>
  <br>
</div>
<br>
 <div class="flex justify-center mb-6">
  <button
    @click="showLeaveModal = true"
    class="bg-[#C0AFFF] text-white px-6 py-2 rounded hover:bg-[#C197DB] shadow"
  >
    طلب إجازة جديدة
  </button>
</div>

  
    <Modal v-if="showLeaveModal" @close="showLeaveModal = false">
      <template #header>
        <h2 class="text-xl font-bold mb-4">نموذج طلب إجازة</h2>
      </template>

      <template #body>
        <form @submit.prevent="submitLeave" class="grid gap-4 md:grid-cols-2">
          <input
            v-model="form.employee"
            type="text"
            placeholder="اسم الموظف"
            class="border p-2 rounded"
            required
          />
          <select v-model="form.type" class="border p-2 rounded" required>
            <option disabled value="">نوع الإجازة</option>
            <option>سنوية</option>
            <option>مرضية</option>
            <option>طارئة</option>
            <option>غير مدفوعة</option>
          </select>
          <input v-model="form.startDate" type="date" class="border p-2 rounded" required />
          <input v-model="form.endDate" type="date" class="border p-2 rounded" required />
          <textarea
            v-model="form.reason"
            placeholder="سبب الإجازة"
            class="border p-2 rounded md:col-span-2"
            required
          ></textarea>
          <button
            type="submit"
            class="bg-[#E0AFFF] text-white px-4 py-2 rounded hover:bg-[#795F8A] md:col-span-2"
          >
            إرسال الطلب
          </button>
        </form>
      </template>
    </Modal>
    <br>
    <!-- جدول الطلبات -->
    <table class="w-full table-auto border-collapse">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2">#</th>
          <th class="border px-4 py-2">الموظف</th>
          <th class="border px-4 py-2">النوع</th>
          <th class="border px-4 py-2">من - إلى</th>
          <th class="border px-4 py-2">السبب</th>
          <th class="border px-4 py-2">الحالة</th>
          <th class="border px-4 py-2">الإجراء</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leave, index) in leaves" :key="index" class="text-center">
          <td class="border px-2 py-1">{{ index + 1 }}</td>
          <td class="border px-2 py-1">{{ leave.employee }}</td>
          <td class="border px-2 py-1">{{ leave.type }}</td>
          <td class="border px-2 py-1">{{ leave.startDate }} → {{ leave.endDate }}</td>
          <td class="border px-2 py-1">{{ leave.reason }}</td>
          <td class="border px-2 py-1">
            <span
              :class="{
                'text-yellow-500': leave.status === 'قيد الانتظار',
                'text-green-600': leave.status === 'مقبولة',
                'text-red-600': leave.status === 'مرفوضة',
              }"
            >
              {{ leave.status }}
            </span>
          </td>
          <td class="border px-2 py-1">
            <div v-if="leave.status === 'قيد الانتظار'" class="space-x-2">
              <button @click="updateStatus(index, 'مقبولة')" class="text-green-600 hover:underline">
                قبول
              </button>
              <button @click="updateStatus(index, 'مرفوضة')" class="text-red-600 hover:underline">
                رفض
              </button>
            </div>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
    
<br>
    <!-- الطلبات المقبولة -->
    <h2 class="text-2xl font-bold text-green-600 mt-12 flex justify-center mb-6">الطلبات المقبولة</h2>
    <table v-if="acceptedLeaves.length" class="w-full table-auto border-collapse">
      <thead class="bg-green-100">
        <tr>
          <th class="border px-4 py-2">#</th>
          <th class="border px-4 py-2">الموظف</th>
          <th class="border px-4 py-2">النوع</th>
          <th class="border px-4 py-2">من - إلى</th>
          <th class="border px-4 py-2">السبب</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leave, index) in acceptedLeaves" :key="index" class="text-center">
          <td class="border px-2 py-1">{{ index + 1 }}</td>
          <td class="border px-2 py-1">{{ leave.employee }}</td>
          <td class="border px-2 py-1">{{ leave.type }}</td>
          <td class="border px-2 py-1">{{ leave.startDate }} → {{ leave.endDate }}</td>
          <td class="border px-2 py-1">{{ leave.reason }}</td>
        </tr>
      </tbody>
    </table> 
    <p v-else class="text-gray-500 flex justify-center mb-6">لا توجد طلبات مقبولة حاليًا.</p>
 <br>
    <!-- الطلبات المرفوضة -->
    <h2 class="text-2xl font-bold text-red-600 mt-12 mb-4 flex justify-center">الطلبات المرفوضة</h2>
    <table v-if="rejectedLeaves.length" class="w-full table-auto border-collapse">
      <thead class="bg-red-100">
        <tr>
          <th class="border px-4 py-2">#</th>
          <th class="border px-4 py-2">الموظف</th>
          <th class="border px-4 py-2">النوع</th>
          <th class="border px-4 py-2">من - إلى</th>
          <th class="border px-4 py-2">السبب</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leave, index) in rejectedLeaves" :key="index" class="text-center">
          <td class="border px-2 py-1">{{ index + 1 }}</td>
          <td class="border px-2 py-1">{{ leave.employee }}</td>
          <td class="border px-2 py-1">{{ leave.type }}</td>
          <td class="border px-2 py-1">{{ leave.startDate }} → {{ leave.endDate }}</td>
          <td class="border px-2 py-1">{{ leave.reason }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="text-gray-500 flex justify-center mb-6">لا توجد طلبات مرفوضة حاليًا.</p>
  </div>
<div class="flex justify-center mb-6"> 
    
    <ConfirmButton/>
</div>
    </diV>
    <br>
    <br>
    <br>
<Footer/>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
import Footer from '@/components/Footer.vue'
import ConfirmButton from '@/components/ConfirmButton.vue'

export default {
  components: {
    Navbar,
    Modal,
  	Footer,
		ConfirmButton,
	},
  data() {
    return {
      showLeaveModal: false,
      form: {
        employee: '',
        type: '',
        startDate: '',
        endDate: '',
        reason: '',
      },
      leaves: [],
    }
  },
  computed: {
    acceptedLeaves() {
      return this.leaves.filter(leave => leave.status === 'مقبولة')
    },
    rejectedLeaves() {
      return this.leaves.filter(leave => leave.status === 'مرفوضة')
    },
  },
  methods: {
    submitLeave() {
      this.leaves.push({ ...this.form, status: 'قيد الانتظار' })
      this.saveLeavesToLocalStorage()
      this.form = { employee: '', type: '', startDate: '', endDate: '', reason: '' }
      this.showLeaveModal = false
    },
    updateStatus(index, status) {
      this.leaves[index].status = status
      this.saveLeavesToLocalStorage()
    },
    saveLeavesToLocalStorage() {
      localStorage.setItem('leave-requests', JSON.stringify(this.leaves))
    },
    loadLeavesFromLocalStorage() {
      const saved = localStorage.getItem('leave-requests')
      if (saved) {
        this.leaves = JSON.parse(saved)
      }
    },
  },
  mounted() {
    this.loadLeavesFromLocalStorage()
  },
}
</script>
