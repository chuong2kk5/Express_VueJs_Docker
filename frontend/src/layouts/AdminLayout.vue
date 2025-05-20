<template>
  <div class="tw-flex tw-min-h-screen tw-bg-gray-100">
    <!-- Sidebar -->
    <aside class="tw-w-64 tw-bg-gray-800 tw-text-white tw-py-6 tw-px-4 tw-flex tw-flex-col tw-shadow-lg">
      <div class="tw-flex tw-items-center tw-justify-center tw-mb-8">
        <h2 class="tw-font-heading tw-text-2xl tw-font-semibold tw-text-white">Admin Panel</h2>
      </div>
      <ul class="tw-space-y-2">
        <li>
          <router-link
            to="/admin/dashboard"
            class="tw-block tw-px-4 tw-py-3 tw-rounded-lg tw-transition tw-duration-200 tw-text-sm tw-font-medium hover:tw-bg-gray-700 hover:tw-text-blue-300 active:tw-bg-blue-900 active:tw-text-blue-200"
            active-class="tw-bg-blue-900 tw-text-blue-200"
            exact
          >
            <svg class="tw-w-5 tw-h-5 tw-inline-block tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/users"
            class="tw-block tw-px-4 tw-py-3 tw-rounded-lg tw-transition tw-duration-200 tw-text-sm tw-font-medium hover:tw-bg-gray-700 hover:tw-text-blue-300 active:tw-bg-blue-900 active:tw-text-blue-200"
            active-class="tw-bg-blue-900 tw-text-blue-200"
            exact
          >
            <svg class="tw-w-5 tw-h-5 tw-inline-block tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            Quản lý người dùng
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/categories"
            class="tw-block tw-px-4 tw-py-3 tw-rounded-lg tw-transition tw-duration-200 tw-text-sm tw-font-medium hover:tw-bg-gray-700 hover:tw-text-blue-300 active:tw-bg-blue-900 active:tw-text-blue-200"
            active-class="tw-bg-blue-900 tw-text-blue-200"
            exact
          >
            <svg class="tw-w-5 tw-h-5 tw-inline-block tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            Quản lý danh mục
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/products"
            class="tw-block tw-px-4 tw-py-3 tw-rounded-lg tw-transition tw-duration-200 tw-text-sm tw-font-medium hover:tw-bg-gray-700 hover:tw-text-blue-300 active:tw-bg-blue-900 active:tw-text-blue-200"
            active-class="tw-bg-blue-900 tw-text-blue-200"
            exact
          >
            <svg class="tw-w-5 tw-h-5 tw-inline-block tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4-8-4"></path>
            </svg>
            Quản lý sản phẩm
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/orders"
            class="tw-block tw-px-4 tw-py-3 tw-rounded-lg tw-transition tw-duration-200 tw-text-sm tw-font-medium hover:tw-bg-gray-700 hover:tw-text-blue-300 active:tw-bg-blue-900 active:tw-text-blue-200"
            active-class="tw-bg-blue-900 tw-text-blue-200"
            exact
          >
            <svg class="tw-w-5 tw-h-5 tw-inline-block tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Đơn hàng
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <div class="tw-flex-1 tw-bg-gray-100">
      <!-- Topbar -->
      <header class="tw-bg-white tw-shadow-sm tw-p-4 tw-flex tw-justify-between tw-items-center">
        <h1 class="tw-font-heading tw-text-xl tw-font-semibold tw-text-gray-800">Admin Dashboard</h1>
        <div class="tw-flex tw-items-center tw-gap-4 tw-relative" ref="dropdownRef">
          <!-- Avatar -->
          <div class="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer" @click="toggleDropdown">
            <img
              :src="user?.avatar || defaultAvatar"
              alt="Avatar"
              class="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover tw-border tw-border-gray-300 tw-transition tw-duration-200 hover:tw-ring-2 hover:tw-ring-blue-300"
            />
            <span class="tw-font-sans tw-font-medium tw-text-gray-700">{{ user?.name || 'Ẩn danh' }}</span>
          </div>

          <!-- Dropdown -->
          <div
            v-if="showDropdown"
            class="tw-absolute tw-top-full tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-lg tw-z-20 tw-py-2"
          >
            <router-link
              to="/profile"
              class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-font-medium hover:tw-bg-gray-100 tw-transition tw-duration-200"
            >
              Hồ sơ
            </router-link>
            <button
              @click="logout"
              class="tw-block tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-red-600 hover:tw-bg-gray-100 tw-transition tw-duration-200"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="tw-p-4 sm:tw-p-6 tw-bg-gray-100 tw-min-h-[calc(100vh-80px)]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref(JSON.parse(localStorage.getItem('user')));
const defaultAvatar = '/images/default-avatar.png';
const showDropdown = ref(false);
const dropdownRef = ref(null);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
}

// Đóng dropdown nếu click ra ngoài
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.tw-container {
  max-width: 1200px;
}
</style>