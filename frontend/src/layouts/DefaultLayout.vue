<template>
  <div class="tw-flex tw-flex-col tw-min-h-screen">
    <!-- Navbar -->
    <nav class="tw-sticky tw-top-0 tw-z-50 tw-bg-white tw-shadow-sm tw-border-b">
      <div class="container tw-flex tw-items-center tw-justify-between tw-py-3">
        <RouterLink to="/" class="tw-text-xl tw-font-bold">APP</RouterLink>

        <ul class="tw-flex tw-gap-6">
          <li><router-link to="/" class="tw-font-semibold hover:tw-text-blue-600">Trang chủ</router-link></li>
          <li><router-link to="/products" class="tw-font-semibold hover:tw-text-blue-600">Sản phẩm</router-link></li>
          <li><router-link to="#" class="tw-font-semibold hover:tw-text-blue-600">Về chúng tôi</router-link></li>
          <li><router-link to="#" class="tw-font-semibold hover:tw-text-blue-600">Tin tức</router-link></li>
        </ul>

        <div class="tw-relative tw-flex tw-items-center tw-gap-3">
          <!-- Giỏ hàng -->
          <router-link to="/cart" class="tw-border tw-rounded-full tw-px-4 tw-py-2 hover:tw-bg-gray-100">
            <i class="fa-solid fa-cart-shopping"></i> Giỏ hàng <span>0</span>
          </router-link>

          <!-- Chưa đăng nhập -->
          <router-link v-if="!isLoggedIn" to="/login"
            class="tw-px-4 tw-py-2 tw-rounded-[20px] tw-border tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600">
            Đăng nhập
          </router-link>

          <!-- Đã đăng nhập -->
          <div v-else class="tw-relative tw-cursor-pointer" @click="toggleDropdown">
            <div class="tw-flex tw-items-center tw-gap-2">
              <img :src="user?.avatar || defaultAvatar" alt="Avatar"
                class="tw-w-8 tw-h-8 tw-rounded-full tw-object-cover" />
              <span class="tw-font-semibold">{{ user?.name || 'Ẩn danh' }}</span>
            </div>

            <div v-if="showDropdown"
              class="tw-absolute tw-top-full tw-right-0 tw-mt-2 tw-w-40 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-10">
              <router-link to="/profile" class="tw-block tw-px-4 tw-py-2 hover:tw-bg-gray-100">Hồ sơ</router-link>
              <button @click="logout"
                class="tw-block tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-100 text-red-600">
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>


    <div class="tw-flex-grow">
      <router-view />
    </div>

    <footer class="tw-bg-white tw-text-gray-600 tw-py-4 tw-border-t">
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-flex tw-items-center tw-justify-center">
          <p>© 2023 APP. All rights reserved.</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-center">
          <p>Privacy Policy</p>
          <p class="tw-mx-2">|</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const showDropdown = ref(false);

const isLoggedIn = computed(() => !!userStore.token);
const user = computed(() => userStore.user); //  Lấy từ store
const defaultAvatar = 'https://www.gravatar.com/avatar/?d=mp';

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function logout() {
  userStore.logout();
  showDropdown.value = false;
  router.push('/login');
}
</script>
