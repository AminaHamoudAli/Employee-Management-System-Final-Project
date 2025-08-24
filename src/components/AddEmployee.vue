
	components: {
		Employee,
	},
	components: {
		Employee,
	},<!-- src/components/AddEmployee.vue -->
<template>
    <div class="bg-[#E0AFFF] m-5 p-7 rounded-4xl ">
      <form @submit.prevent="submitForm">
  <button type="submit">إضافة</button>
</form>

      
<form @submit.prevent="handleSubmit" class="bg-white p-4 rounded-4xl shadow mb-4 space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="employee.name" placeholder="الاسم" class="input border rounded-2xl h-12 m-2.5 " required />
      <input v-model="employee.email" type="email" placeholder="الايميل" class="input border rounded-2xl h-12 m-2.5" required />
      <input v-model="employee.salary" type="number" placeholder="الراتب" class="input border rounded-2xl h-12 m-2.5" required />

      <select v-model="employee.department" class="input rounded-2xl h-12 m-2.5 border" required>
        <option value="">اختر القسم</option>
         <option>تقنية معلومات</option>
        <option>برمجيات</option>
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
  <br>
    </div>
    <div class="flex justify-center mt-6 ">
  <button type="submit" class=" bg-[#C197DB] mt hover:bg-[#E0AFFF] text-white px-4 py-2 rounded  h-12 ">إضافة </button>
</div>

  </form>
</div>

</template>

<!-- <script>
import Employee from '@/views/Employee.vue'

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
        // leaveStatus: ''
      }
    }
  },
methods: {
  handleSubmit() {
    // التحقق من الاسم
    if (!this.employee.name || this.employee.name.length < 3) {
      alert('الرجاء إدخال اسم لا يقل عن 3 حروف.');
      return;
    }

    // التحقق من البريد الإلكتروني
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.employee.email || !emailPattern.test(this.employee.email)) {
      alert('الرجاء إدخال بريد إلكتروني صالح.');
      return;
    }

    // التحقق من الراتب
    if (!this.employee.salary || this.employee.salary <= 0) {
      alert('الرجاء إدخال راتب صحيح (رقم موجب).');
      return;
    }

    // التحقق من الحقول المطلوبة الأخرى
    const requiredFields = ['department', 'contract', 'evaluation'];
    for (let field of requiredFields) {
      if (!this.employee[field]) {
        alert(`الرجاء اختيار ${this.translateField(field)}.`);
        return;
      }
    }

    // إنشاء الموظف الجديد
    const newEmployee = {
      ...this.employee,
      id: Date.now()
    }

    // حفظ البيانات في localStorage
    // const employees = JSON.parse(localStorage.getItem('employees')) || [];
    // employees.push(newEmployee);
    // localStorage.setItem('employees', JSON.stringify(employees));

    // إرسال الحدث للأب
    this.$emit('add-employee', newEmployee);

    // إعادة تعيين النموذج
    this.employee = {
      name: '',
      email: '',
      salary: '',
      department: '',
      contract: '',
      evaluation: '',
    }
  },

  translateField(field) {
    const map = {
      department: 'القسم',
      contract: 'نوع العقد',
      evaluation: 'التقييم',
    };
    return map[field] || field;
  }
}

}
</script> -->

<script>
import Employee from '@/views/Employee.vue'

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
        // leaveStatus: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // التحقق من الاسم
      if (!this.employee.name || this.employee.name.length < 3) {
        alert('الرجاء إدخال اسم لا يقل عن 3 حروف.');
        return;
      }

      // التحقق من البريد الإلكتروني
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.employee.email || !emailPattern.test(this.employee.email)) {
        alert('الرجاء إدخال بريد إلكتروني صالح.');
        return;
      }

      // التحقق من الراتب
      if (!this.employee.salary || this.employee.salary <= 0) {
        alert('الرجاء إدخال راتب صحيح (رقم موجب).');
        return;
      }

      // التحقق من الحقول المطلوبة الأخرى
      const requiredFields = ['department', 'contract', 'evaluation'];
      for (let field of requiredFields) {
        if (!this.employee[field]) {
          alert(`الرجاء اختيار ${this.translateField(field)}.`);
          return;
        }
      }

      
      fetch("http://localhost/capstone4-mvc1/Employee.php", {
      // fetch("http://localhost/capstone4-mvc1/app/controllers/EmployeeController.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.employee)
      })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          alert(data.error);
        } else {
          alert(data.message);

          // إنشاء الموظف الجديد مع ID من PHP
          const newEmployee = { ...this.employee, id: data.id };

          // إرسال الحدث للأب لتحديث الواجهة
          this.$emit('add-employee', newEmployee);

          // إعادة تعيين النموذج
          this.employee = {
            name: '',
            email: '',
            salary: '',
            department: '',
            contract: '',
            evaluation: '',
          };
        }
      })
      .catch(err => {
        console.error(err);
        alert("حدث خطأ أثناء الإضافة");
      });
    },

    translateField(field) {
      const map = {
        department: 'القسم',
        contract: 'نوع العقد',
        evaluation: 'التقييم',
      };
      return map[field] || field;
    }
  }
}
</script>

