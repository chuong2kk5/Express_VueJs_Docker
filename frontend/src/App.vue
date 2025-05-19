<template>
  <DefaultLayout>
    <ProductList />
    <router-view />
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue';
import ProductList from './views/ProductList.vue';
</script>
