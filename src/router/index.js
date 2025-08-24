import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Employee from '@/views/Employee.vue';
// import About from '../views/About.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import Salary from '@/views/Salary.vue';
import LeaveManagement from '@/views/LeaveManagement.vue';
import DashBord from '@/views/DashBord.vue';
import EmployeeList from '@/views/EmployeeList.vue'
import AddEmployeePage from '@/views/AddEmployeePage.vue'
import login from '@/views/login.vue'


const routes = [
    // { 
    //     path: '/', 
    //     name: 'Employee',
    //      component: Employee,
    //        meta:{
    //         title:"اضافة موظفين",
    //     },
    //  },
// { path: '/', name: 'Home', component: Home },
 {
    path: '/',
    name: 'DashBord',
    component: DashBord,
    meta: { title: 'لوحة التحكم' },
    
  },




  
 
 {
    path: '/login',
    name: 'login',
    component: login,
    meta: { title: 'تسجيل دخول ' },
  },
{
  path: '/AddEmployeePage',
  name: 'AddEmployeePage',
  component: AddEmployeePage,
  meta: { title: 'اضافة موظف ' },
},

{ 
    path: '/profile/:id', 
    name: 'ProfilePage',
     component: ProfilePage,
     meta:{
        title:" ",
    },
},
{
  path: '/EmployeeList',
  name: 'EmployeeList',
  component: EmployeeList,
  meta: { title: 'قايمة الموظفين ' },
},
{ 
    path: '/salary', 
    name: 'Salary',
     component: Salary,
       meta:{
        title:"ملخص الراتب",
    },
    },
  {
    path: '/leaves',
    name: 'leaves',
    component: LeaveManagement,
    meta: { title: 'إدارة الإجازات' },
  },
 


];
const router = createRouter({
history: createWebHistory(),
routes
});
export default router;




