<template>
  <div class="bg-gray-50">
    <!-- بحث -->
    <input
      type="text"
      v-model="localFilters.search"
      placeholder=" بحث بالاسم"
      class=" bg-gray-100 border rounded px-4 py-2 mb-4 w-full md:w-1/2"
    />

    <!--  الأقسام -->
    <select v-model="localFilters.department" class="border rounded px-4 py-2 mr-2">
      <option value="">كل الأقسام</option>
      <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
    </select>

    <!--  التقييم -->
    <select v-model="localFilters.evaluation" class="border rounded px-4 py-2">
      <option value="">كل التقييمات</option>
      <option value="ممتاز">ممتاز</option>
      <option value="جيد">جيد</option>
      <option value="يحتاج تحسين">يحتاج تحسين</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    departments: Array,
    modelValue: Object,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localFilters: { ...this.modelValue }
    }
  },
  watch: {
    localFilters: {
      handler(newVal) {
        this.$emit('update:modelValue', newVal)
      },
      deep: true
    },
    modelValue: {
      handler(newVal) {
        this.localFilters = { ...newVal }
      },
      deep: true
    }
  }
}
</script>
