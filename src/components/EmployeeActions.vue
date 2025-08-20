<template>
  <div class="flex gap-2 justify-center">
     <button
      @click="softDelete"
      class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
    >
      حذف مؤقت
    </button>


    <button
      @click="openConfirm"
      class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      حذف نهائي
    </button>


    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h2 class="text-xl font-bold mb-4 text-red-600">تأكيد الحذف النهائي</h2>
        <p class="mb-6">هل أنت متأكد أنك تريد حذف هذا الموظف نهائيًا؟ لا يمكن التراجع عن هذه العملية.</p>
        <div class="flex justify-center gap-4">
          <button
            @click="confirmDelete"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            نعم، احذف
          </button>
          <button
            @click="showModal = false"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeActions',
  props: {
    employeeId: {
      type: [Number, String],
      required: true
    },
    inTrash: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    softDelete() {
      this.$emit('soft-delete', this.employeeId)
    },
    restore() {
      this.$emit('restore', this.employeeId)
    },
    openConfirm() {
      this.showModal = true
    },
    confirmDelete() {
      this.$emit('hard-delete', this.employeeId)
      this.showModal = false
    }
  }
}
</script>

