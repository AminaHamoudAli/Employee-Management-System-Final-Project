
<template>
  <div
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
      <!-- زر الإغلاق -->
      <button
        @click="$emit('close')"
        class="absolute top-2 left-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
      >
        &times;
      </button>

      <!-- العنوان -->
      <h2 class="text-xl font-bold mb-4 text-blue-700">
        <slot name="title" />
      </h2>

      <!-- المحتوى -->
      <div>
        <slot name="body" />
      </div>
    </div>
  </div>
</template>
