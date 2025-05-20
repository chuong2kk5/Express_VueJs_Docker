<template>
  <div class="tw-flex tw-min-h-screen tw-bg-gray-50">
    <!-- Sidebar -->
   <aside class="tw-w-64 tw-bg-gray-200 tw-text-gray-800 tw-py-6 tw-px-4">
  <h2 class="tw-text-xl tw-font-bold tw-mb-6 text-center">Admin Panel</h2>
  <ul class="tw-space-y-4">
    <li>
      <router-link
        to="/admin/dashboard"
        class="tw-block hover:tw-text-blue-600 tw-px-3 tw-py-2 tw-rounded"
        active-class="tw-bg-blue-100 tw-text-blue-700"
        exact
      >
        Dashboard
      </router-link>
    </li>
    <li>
      <router-link
        to="/admin/users"
        class="tw-block hover:tw-text-blue-600 tw-px-3 tw-py-2 tw-rounded"
        active-class="tw-bg-blue-100 tw-text-blue-700"
        exact
      >
        Quản lý người dùng
      </router-link>
    </li>
    <li>
      <router-link
        to="/admin/products"
        class="tw-block hover:tw-text-blue-600 tw-px-3 tw-py-2 tw-rounded"
        active-class="tw-bg-blue-100 tw-text-blue-700"
        exact
      >
        Quản lý sản phẩm
      </router-link>
    </li>
    <li>
      <router-link
        to="/admin/orders"
        class="tw-block hover:tw-text-blue-600 tw-px-3 tw-py-2 tw-rounded"
        active-class="tw-bg-blue-100 tw-text-blue-700"
        exact
      >
        Đơn hàng
      </router-link>
    </li>
  </ul>
</aside>


    <!-- Main content -->
    <div class="tw-flex-1 tw-bg-white">
      <!-- Topbar -->
      <header class="tw-bg-white tw-shadow-sm tw-p-4 tw-flex tw-justify-between tw-items-center">
        <h1 class="tw-text-xl tw-font-semibold text-gray-700">Admin Dashboard</h1>

        <div class="tw-flex tw-items-center tw-gap-4 tw-relative" ref="dropdownRef">
          <!-- Avatar -->
          <div class="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer" @click="toggleDropdown">
            <img :src="user?.avatar || defaultAvatar" alt="Avatar"
              class="tw-w-8 tw-h-8 tw-rounded-full tw-object-cover border tw-border-gray-300" />
            <span class="tw-font-semibold text-gray-700">{{ user?.name || 'Ẩn danh' }}</span>
          </div>

          <!-- Dropdown -->
          <div v-if="showDropdown"
            class="tw-absolute tw-top-full tw-right-0 tw-mt-2 tw-w-44 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-20">
            <router-link to="/profile" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100">Hồ sơ</router-link>
            <button @click="logout"
              class="tw-block tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100 tw-text-red-600">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="tw-p-6 tw-bg-gray-50 min-h-[calc(100vh-80px)]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref(JSON.parse(localStorage.getItem('user')))
const defaultAvatar = '/images/default-avatar.png'
const showDropdown = ref(false)
const dropdownRef = ref(null)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

// Đóng dropdown nếu click ra ngoài
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
