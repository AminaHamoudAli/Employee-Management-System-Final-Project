

<!-- <template>
  <div class="bg-[#E0AFFF] m-5 p-7 rounded-4xl">
    <form @submit.prevent="handleSubmit" class="bg-white p-4 rounded-4xl shadow mb-4 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="employee.name" placeholder="الاسم" class="input border rounded-2xl h-12 m-2.5" required />
        <input v-model="employee.email" type="email" placeholder="الايميل" class="input border rounded-2xl h-12 m-2.5" required />
        <input v-model="employee.salary" type="number" placeholder="الراتب" class="input border rounded-2xl h-12 m-2.5" required />

        <select v-model="employee.department" class="input rounded-2xl h-12 m-2.5 border" required>
          <option value="">اختر القسم</option>
          <option v-for="dept in departments" :key="dept">{{ dept }}</option>
        </select>

        <select v-model="employee.contract" class="input rounded-2xl h-12 m-2.5 border" required>
          <option value="">نوع العقد</option>
          <option>دائم</option>
          <option>مؤقت</option>
        </select>

        <select v-model="employee.evaluation" class="input rounded-2xl h-12 m-2.5 border" required>
          <option value="">التقييم</option>
          <option>ممتاز</option>
          <option>جيد</option>
          <option>يحتاج تحسين</option>
        </select>
      </div>

      <div class="flex justify-center mt-6">
        <button type="submit" class="bg-[#C197DB] hover:bg-[#E0AFFF] text-white px-4 py-2 rounded h-12">
          إضافة
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createEmployee } from '@/services/api.js';

export default {
  name: 'AddEmployee',
  props: {
    departments: Array,
  },
  data() {
    return {
      employee: {
        name: '',
        email: '',
        salary: '',
        department: '',
        contract: '',
        evaluation: '',
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const data = await createEmployee(this.employee);

        // التحقق من وجود البيانات
        if (!data || !data.data || !data.data.data) {
          alert("حدث خطأ أثناء إضافة الموظف");
          return;
        }

        const empId = data.data.data.id;
        alert(data.data.data.message || "تمت إضافة الموظف");

        // إرسال الحدث للأب لتحديث الواجهة
        this.$emit('add-employee', { ...this.employee, id: empId });
        console.log(this.employee);

        // إعادة تعيين النموذج
        this.employee = { name:'', email:'', salary:'', department:'', contract:'', evaluation:'' };

      } catch(err) {
        console.error(err);
        alert("حدث خطأ أثناء الاتصال بالباك");
      }
    }
  }
}
</script> -->


<template>
  <div class="bg-[#E0AFFF] m-5 p-7 rounded-4xl">
    <form @submit.prevent="handleSubmit" class="bg-white p-4 rounded-4xl shadow mb-4 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="employee.name" placeholder="الاسم" class="input border rounded-2xl h-12 m-2.5" required />
        <input v-model="employee.email" type="email" placeholder="الايميل" class="input border rounded-2xl h-12 m-2.5" required />
        <input v-model="employee.salary" type="number" placeholder="الراتب" class="input border rounded-2xl h-12 m-2.5" required />

        <select v-model="employee.department" class="input rounded-2xl h-12 m-2.5 border" required>
          <option value="">اختر القسم</option>
          <option v-for="dept in departments" :key="dept">{{ dept }}</option>
        </select>

        <select v-model="employee.contract" class="input rounded-2xl h-12 m-2.5 border" required>
          <option value="">نوع العقد</option>
          <option>دائم</option>
          <option>مؤقت</option>
        </select>

        <select v-model="employee.evaluation" class="input rounded-2xl h-12 m-2.5 border" required>
          <option value="">التقييم</option>
          <option>ممتاز</option>
          <option>جيد</option>
          <option>يحتاج تحسين</option>
        </select>
      </div>

      <div class="flex justify-center mt-6">
        <button type="submit" class="bg-[#C197DB] hover:bg-[#E0AFFF] text-white px-4 py-2 rounded h-12">
          إضافة
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createEmployee } from '@/services/api.js';

export default {
  name: 'AddEmployee',
  props: {
    departments: Array,
  },
  data() {
    return {
      employee: {
        name: '',
        email: '',
        salary: '',
        department: '',
        contract: '',
        evaluation: '',
      }
    }
  },
  methods: {
   async handleSubmit() {
  try {
    const data = await createEmployee(this.employee);

    if (!data || !data.data || !data.data.data) {
      alert("حدث خطأ أثناء إضافة الموظف");
      return;
    }

    const empId = data.data.data.id;
    alert(data.data.data.message || "تمت إضافة الموظف");

    this.$emit('add-employee', { ...this.employee, id: empId });

    // إعادة تعيين النموذج
    this.employee = { name:'', email:'', salary:'', department:'', contract:'', evaluation:'' };

  } catch(err) {
    console.error(err);
    alert("حدث خطأ أثناء الاتصال بالباك");
  }
}

  }
}
</script>
