<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <router-view></router-view>
    </div>
    <!--    Here goes the footer-->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {NavBar}
}
</script>

<style scoped>

</style>