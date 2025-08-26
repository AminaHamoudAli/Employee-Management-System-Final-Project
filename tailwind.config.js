// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// module.exports = {
//   darkMode: 'class',
//    extend: {
//       fontFamily: {
//          tajawal: ['Tajawal', 'sans-serif'],
//       },}
//   // ...
// }
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./index.html', './src//*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { tajawal: ['Tajawal', 'sans-serif'] },
    },
  },
  plugins: [],
};