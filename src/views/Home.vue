<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Base aaa='aaa' msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from 'vue';
import Base from '@/components/Base.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Base,
  },
  setup(){
    onMounted(() => {
      console.log('globalProperties',getCurrentInstance()?.proxy?.$message);
    });
  },
});
</script>
