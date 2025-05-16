<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-xl p-4 shadow-md"
      >
        <img
          :src="product.image_url"
          :alt="product.name"
          class="w-full h-48 object-cover rounded mb-2"
        />
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-blue-600 font-bold">{{ product.price.toLocaleString() }}₫</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductList",

  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        this.products = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Tuỳ chọn thêm style nếu cần */
</style>
