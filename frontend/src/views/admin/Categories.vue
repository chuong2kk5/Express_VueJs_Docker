<template>
  <AdminLayout>
    <div class="tw-container tw-mx-auto tw-p-4 sm:tw-p-6">
      <!-- Header -->
      <div class="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center tw-mb-6 tw-gap-4">
        <h1 class="tw-text-2xl sm:tw-text-3xl tw-font-semibold tw-text-gray-800">Danh mục sản phẩm</h1>
        <button
          @click="addCategory"
          class="tw-bg-blue-600 tw-text-white tw-px-4 sm:tw-px-6 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-blue-700 tw-transition tw-duration-300 tw-flex tw-items-center tw-gap-2"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Thêm danh mục
        </button>
      </div>

      <!-- Table -->
      <div class="tw-bg-white tw-rounded-xl tw-shadow-md tw-overflow-hidden">
        <div class="tw-overflow-x-auto">
          <table class="tw-w-full tw-border-collapse">
            <thead class="tw-bg-gray-50">
              <tr>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">ID</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Tên danh mục</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Slug</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="category in categories"
                :key="category.id"
                class="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50 tw-transition tw-duration-150"
              >
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ category.id }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ category.name }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ category.slug }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-flex tw-gap-2">
                  <button
                    @click="editCategory(category)"
                    class="tw-bg-yellow-500 tw-text-white tw-px-3 sm:tw-px-4 tw-py-1.5 tw-rounded-lg tw-font-medium hover:tw-bg-yellow-600 tw-transition tw-duration-300"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deleteCategory(category.id)"
                    class="tw-bg-red-500 tw-text-white tw-px-3 sm:tw-px-4 tw-py-1.5 tw-rounded-lg tw-font-medium hover:tw-bg-red-600 tw-transition tw-duration-300"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Loading and Error States -->
      <div v-if="loading" class="tw-mt-6 tw-text-center tw-text-gray-600 tw-font-medium">
        <svg class="tw-w-6 tw-h-6 tw-animate-spin tw-inline-block tw-mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle class="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Đang tải dữ liệu...
      </div>
      <div v-if="error" class="tw-mt-6 tw-text-center tw-text-red-500 tw-font-medium">{{ error }}</div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const categories = ref([]);
const loading = ref(false);
const error = ref('');

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await axios.get('http://localhost:3000/api/categories');
    categories.value = res.data;
  } catch (err) {
    error.value = 'Không thể tải danh sách danh mục.';
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể tải danh sách danh mục.',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } finally {
    loading.value = false;
  }
};

const addCategory = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Thêm danh mục mới',
    html: `
      <form id="swal-form" style="display: flex; flex-direction: column; gap: 12px; padding: 0 10px;">
        <input id="name" class="swal2-input" placeholder="Tên danh mục" required>
        <input id="slug" class="swal2-input" placeholder="Slug" required>
      </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Thêm',
    cancelButtonText: 'Hủy',
    buttonsStyling: false,
    customClass: {
      confirmButton: 'tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-blue-700 tw-transition tw-duration-300',
      cancelButton: 'tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-gray-300 tw-transition tw-duration-300',
    },
    preConfirm: () => {
      const name = document.getElementById('name').value.trim();
      const slug = document.getElementById('slug').value.trim();
      if (!name || !slug) {
        Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin!');
        return false;
      }
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) {
        Swal.showValidationMessage('Slug chỉ được chứa chữ thường, số và dấu gạch ngang!');
        return false;
      }
      return { name, slug };
    },
  });

  if (formValues) {
    try {
      const res = await axios.post('http://localhost:3000/api/categories', formValues);
      categories.value.push(res.data);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Thêm danh mục thành công!',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể thêm danh mục!',
        text: err.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

const editCategory = async (category) => {
  const { value: formValues } = await Swal.fire({
    title: 'Sửa danh mục',
    html: `
      <form id="swal-form" style="display: flex; flex-direction: column; gap: 12px; padding: 0 10px;">
        <input id="name" class="swal2-input" placeholder="Tên danh mục" value="${category.name}" required>
        <input id="slug" class="swal2-input" placeholder="Slug" value="${category.slug}" required>
      </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    buttonsStyling: false,
    customClass: {
      confirmButton: 'tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-blue-700 tw-transition tw-duration-300',
      cancelButton: 'tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-gray-300 tw-transition tw-duration-300',
    },
    preConfirm: () => {
      const name = document.getElementById('name').value.trim();
      const slug = document.getElementById('slug').value.trim();
      if (!name || !slug) {
        Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin!');
        return false;
      }
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) {
        Swal.showValidationMessage('Slug chỉ được chứa chữ thường, số và dấu gạch ngang!');
        return false;
      }
      return { name, slug };
    },
  });

  if (formValues) {
    try {
      const res = await axios.put(`http://localhost:3000/api/categories/${category.id}`, formValues);
      const index = categories.value.findIndex((c) => c.id === category.id);
      categories.value[index] = res.data;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật danh mục thành công!',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể cập nhật danh mục!',
        text: err.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

const deleteCategory = async (id) => {
  const result = await Swal.fire({
    title: 'Xóa danh mục',
    text: 'Bạn có chắc chắn muốn xóa danh mục này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    buttonsStyling: false,
    customClass: {
      confirmButton: 'tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-red-700 tw-transition tw-duration-300',
      cancelButton: 'tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-gray-300 tw-transition tw-duration-300',
    },
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      categories.value = categories.value.filter((c) => c.id !== id);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Xóa danh mục thành công!',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể xóa danh mục!',
        text: err.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

onMounted(fetchCategories);
</script>

<style scoped>
.tw-container {
  max-width: 1200px;
}
</style>