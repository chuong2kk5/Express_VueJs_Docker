<template>
  <DefaultLayout />
  <!-- hieenj thi san pham -->
  <ProductList />
  <router-view />
</template>

<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue';
import ProductList from './components/ProductList.vue';

</script>