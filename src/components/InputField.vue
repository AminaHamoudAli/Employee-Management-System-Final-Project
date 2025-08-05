<template>
  <div class="mb-4">
    <label :for="id" class="block mb-1 font-bold text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      class="w-full px-4 py-2 border rounded shadow-sm" />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    modelValue: String
  },
  emits: ['update:modelValue'],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>
