
<template>
  <table class="w-full table-auto border mt-5 p-7">
    <thead>
      <tr class="bg-[#C197DB] m-5 p-7">
        <th class="p-2">الاسم</th>
        <th class="p-2">القسم</th>
        <th class="p-2">الراتب</th>
        <th class="p-2">نوع العقد</th>                
        <th class="p-2">الإجراءات</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="emp in employees" :key="emp.id" class="text-center m-5 p-7">
        <td class="p-2">{{ emp.name }}</td>
        <td class="p-2">{{ emp.department }}</td>
        <td class="p-2">{{ emp.salary }}</td>
        <td class="p-2">{{ emp.contract }}</td>
        <td class="p-2">
          <router-link
            :to="`/profile/${emp.id}`"
            class=" bg-[#C197DB] text-white px-4 py-2 rounded h-12 m-2.5" >
            عرض التفاصيل
          </router-link>
        </td>
  
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['employees']
}
</script>
