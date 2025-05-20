<template>
  <div class="tw-container tw-mx-auto tw-p-4 sm:tw-p-6">
    <!-- Header -->
    <h1 class="tw-font-heading tw-text-2xl sm:tw-text-3xl tw-font-semibold tw-text-gray-800 tw-mb-6">
      Sản phẩm
    </h1>
    <div v-if="loading" class="tw-text-center tw-text-gray-600 tw-font-medium tw-my-8">
      <svg
        class="tw-w-6 tw-h-6 tw-animate-spin tw-inline-block tw-mr-2"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="tw-opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Đang tải sản phẩm...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="tw-text-center tw-text-red-500 tw-font-medium tw-my-8">
      {{ error }}
    </div>

    <!-- Empty State -->
    <div
      v-else-if="products.length === 0"
      class="tw-text-center tw-text-gray-600 tw-font-medium tw-my-8"
    >
      Chưa có sản phẩm nào.
    </div>

    <!-- Product Grid -->
    <div
      v-else
      class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="tw-border tw-border-gray-200 tw-rounded-xl tw-shadow-sm tw-overflow-hidden tw-bg-white tw-flex tw-flex-col tw-transition tw-duration-200 hover:tw-shadow-md"
      >
        <img
          :src="product.image_url || 'https://via.placeholder.com/300?text=No+Image'"
          :alt="`Hình ảnh sản phẩm ${product.name}`"
          class="tw-w-full tw-h-48 tw-object-cover tw-bg-gray-100"
          @error="handleImageError"
        />
        <div class="tw-p-4 tw-flex-1">
          <h3
            class="tw-font-heading tw-text-lg tw-font-semibold tw-text-gray-800 tw-line-clamp-2"
          >
            {{ product.name }}
          </h3>
          <p class="tw-font-sans tw-text-sm tw-text-gray-600 tw-mt-1">
            {{ product.category_name || 'Chưa phân loại' }}
          </p>
          <p class="tw-font-sans tw-text-red-600 tw-font-bold tw-mt-2">
            {{ formatPrice(product.price) }}
          </p>
        </div>
        <div class="tw-px-4 tw-pb-4 tw-flex tw-gap-2">
          <button
            @click="addToCart(product)"
            class="tw-bg-blue-600 tw-text-white tw-rounded-lg tw-py-2 tw-px-4 tw-text-sm tw-font-medium tw-w-full tw-transition tw-duration-200 hover:tw-bg-blue-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-300"
            aria-label="Thêm sản phẩm vào giỏ hàng"
          >
            Thêm vào giỏ
          </button>
          <button
            @click="buyNow(product)"
            class="tw-bg-green-600 tw-text-white tw-rounded-lg tw-py-2 tw-px-4 tw-text-sm tw-font-medium tw-w-full tw-transition tw-duration-200 hover:tw-bg-green-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-300"
            aria-label="Mua ngay sản phẩm"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const products = ref([]);
const loading = ref(false);
const error = ref('');

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await axios.get('http://localhost:3000/api/products');
    products.value = res.data;
  } catch (err) {
    error.value = 'Không thể tải danh sách sản phẩm.';
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể tải danh sách sản phẩm.',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300?text=No+Image';
};

const addToCart = (product) => {
  // Placeholder for cart functionality
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `Đã thêm ${product.name} vào giỏ hàng!`,
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
  });
  console.log('Thêm vào giỏ hàng:', product);
};

const buyNow = (product) => {
  // Placeholder for buy now functionality
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: `Chuyển đến thanh toán cho ${product.name}`,
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
  });
  console.log('Mua ngay:', product);
};

onMounted(fetchProducts);
</script>

<style scoped>
.tw-container {
  max-width: 1200px;
}
</style>