
<template>
  <!-- <div class= "max-w-7xl mx-auto flex items-center justify-between">
    <router-link to="/about">About</router-link>
    <router-link to="/HomePage">HomePage</router-link>
    <router-link to="./views/About.vue">About</router-link>
    
  </div> -->
  
  <!-- <Navber /> -->
  <router-view></router-view>
</template>


<script>


import Navber from './components/Navbar.vue';

export default{
  components:{
    Navber,
		
	}
}




</script>


