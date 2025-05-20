<template>
  <AdminLayout>
    <div class="tw-container tw-mx-auto tw-p-4 sm:tw-p-6">
      <!-- Header -->
      <div class="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center tw-mb-6 tw-gap-4">
        <h1 class="tw-font-heading tw-text-2xl sm:tw-text-3xl tw-font-semibold tw-text-gray-800">Danh sách sản phẩm</h1>
        <button
          @click="addProduct"
          class="tw-bg-blue-600 tw-text-white tw-px-4 sm:tw-px-6 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-blue-700 tw-transition tw-duration-300 tw-flex tw-items-center tw-gap-2"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Thêm sản phẩm
        </button>
      </div>

      <!-- Table -->
      <div class="tw-bg-white tw-rounded-xl tw-shadow-md tw-overflow-hidden">
        <div class="tw-overflow-x-auto">
          <table class="tw-w-full tw-border-collapse">
            <thead class="tw-bg-gray-50">
              <tr>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">ID</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Tên</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Slug</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Giá</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Danh mục</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Ảnh</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product.id"
                class="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50 tw-transition tw-duration-150"
              >
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ product.id }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ product.name }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ product.slug }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ formatPrice(product.price) }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ product.category_name || 'N/A' }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4">
                  <img
                    v-if="product.image_url"
                    :src="product.image_url"
                    alt="Product Image"
                    class="tw-w-12 tw-h-12 tw-object-cover tw-rounded tw-border tw-border-gray-200"
                  />
                  <span v-else class="tw-text-sm tw-text-gray-500">Chưa có ảnh</span>
                </td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-flex tw-gap-2">
                  <button
                    @click="editProduct(product)"
                    class="tw-bg-yellow-500 tw-text-white tw-px-3 sm:tw-px-4 tw-py-1.5 tw-rounded-lg tw-font-medium hover:tw-bg-yellow-600 tw-transition tw-duration-300"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
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

const products = ref([]);
const loading = ref(false);
const error = ref('');
const categories = ref([]);

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

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/categories');
    categories.value = res.data;
  } catch (err) {
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
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const addProduct = async () => {
  await fetchCategories();
  const categoryOptions = categories.value
    .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
    .join('');

  const { value: formValues } = await Swal.fire({
    title: 'Thêm sản phẩm mới',
    html: `
      <form id="swal-form" style="display: flex; flex-direction: column; gap: 12px; padding: 0 10px;">
        <input id="swal-name" class="swal2-input" placeholder="Tên sản phẩm" required>
        <input id="swal-slug" class="swal2-input" placeholder="Slug" required>
        <input id="swal-price" class="swal2-input" placeholder="Giá" type="number" min="0" required>
        <textarea id="swal-description" class="swal2-textarea" placeholder="Mô tả"></textarea>
        <select id="swal-category" class="swal2-select" required>
          <option value="" disabled selected>Chọn danh mục</option>
          ${categoryOptions}
        </select>
        <input 
          id="swal-image" 
          type="file" 
          accept="image/*" 
          style="
            padding: 6px 8px; 
            border-radius: 5px; 
            border: 1px solid #ccc; 
            cursor: pointer;
            font-size: 14px;
            color: #333;
            background: #f9fafb;
          "
        >
        <small id="file-name" style="font-size: 12px; color: #666; text-align: center;">Chưa chọn tệp</small>
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
    didOpen: () => {
      const fileInput = document.getElementById('swal-image');
      const fileNameDisplay = document.getElementById('file-name');

      let imgPreview = document.createElement('img');
      imgPreview.style.maxWidth = '100px';
      imgPreview.style.maxHeight = '100px';
      imgPreview.style.margin = '10px auto';
      imgPreview.style.display = 'block';
      imgPreview.style.borderRadius = '8px';
      imgPreview.style.objectFit = 'cover';
      fileNameDisplay.insertAdjacentElement('beforebegin', imgPreview);

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
          fileNameDisplay.textContent = file.name;
          const reader = new FileReader();
          reader.onload = (e) => {
            imgPreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          fileNameDisplay.textContent = 'Chưa chọn tệp';
          imgPreview.src = '';
        }
      });

      document.getElementById('swal-name').focus();
    },
    preConfirm: () => {
      const name = document.getElementById('swal-name').value.trim();
      const slug = document.getElementById('swal-slug').value.trim();
      const price = document.getElementById('swal-price').value;
      const description = document.getElementById('swal-description').value.trim();
      const category_id = document.getElementById('swal-category').value;
      const image = document.getElementById('swal-image').files[0];

      if (!name || !slug || !price || !category_id) {
        Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin bắt buộc.');
        return false;
      }
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) {
        Swal.showValidationMessage('Slug chỉ được chứa chữ thường, số và dấu gạch ngang!');
        return false;
      }
      if (price < 0) {
        Swal.showValidationMessage('Giá không được âm!');
        return false;
      }
      return { name, slug, price, description, category_id, image };
    },
  });

  if (formValues) {
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('slug', formValues.slug);
      formData.append('price', formValues.price);
      formData.append('description', formValues.description);
      formData.append('category_id', formValues.category_id);
      if (formValues.image) {
        formData.append('image', formValues.image);
      }

      const res = await axios.post('http://localhost:3000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      products.value.push(res.data);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Thêm sản phẩm thành công!',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể thêm sản phẩm!',
        text: error.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

const editProduct = async (product) => {
  await fetchCategories();
  const categoryOptions = categories.value
    .map(cat => `<option value="${cat.id}" ${cat.id === product.category_id ? 'selected' : ''}>${cat.name}</option>`)
    .join('');

  const { value: formValues } = await Swal.fire({
    title: 'Sửa sản phẩm',
    html: `
      <form id="swal-form" style="display: flex; flex-direction: column; gap: 12px; padding: 0 10px;">
        <input id="swal-name" class="swal2-input" placeholder="Tên sản phẩm" value="${product.name}" required>
        <input id="swal-slug" class="swal2-input" placeholder="Slug" value="${product.slug}" required>
        <input id="swal-price" class="swal2-input" placeholder="Giá" type="number" min="0" value="${product.price}" required>
        <textarea id="swal-description" class="swal2-textarea" placeholder="Mô tả">${product.description || ''}</textarea>
        <select id="swal-category" class="swal2-select" required>
          <option value="" disabled>Chọn danh mục</option>
          ${categoryOptions}
        </select>
        <input 
          id="swal-image" 
          type="file" 
          accept="image/*" 
          style="
            padding: 6px 8px; 
            border-radius: 5px; 
            border: 1px solid #ccc; 
            cursor: pointer;
            font-size: 14px;
            color: #333;
            background: #f9fafb;
          "
        >
        <small id="file-name" style="font-size: 12px; color: #666; text-align: center;">Chưa chọn tệp</small>
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
    didOpen: () => {
      const fileInput = document.getElementById('swal-image');
      const fileNameDisplay = document.getElementById('file-name');

      let imgPreview = document.createElement('img');
      imgPreview.style.maxWidth = '100px';
      imgPreview.style.maxHeight = '100px';
      imgPreview.style.margin = '10px auto';
      imgPreview.style.display = 'block';
      imgPreview.style.borderRadius = '8px';
      imgPreview.style.objectFit = 'cover';
      if (product.image_url) imgPreview.src = product.image_url;
      fileNameDisplay.insertAdjacentElement('beforebegin', imgPreview);

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
          fileNameDisplay.textContent = file.name;
          const reader = new FileReader();
          reader.onload = (e) => {
            imgPreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          fileNameDisplay.textContent = 'Chưa chọn tệp';
          imgPreview.src = product.image_url || '';
        }
      });

      document.getElementById('swal-name').focus();
    },
    preConfirm: () => {
      const name = document.getElementById('swal-name').value.trim();
      const slug = document.getElementById('swal-slug').value.trim();
      const price = document.getElementById('swal-price').value;
      const description = document.getElementById('swal-description').value.trim();
      const category_id = document.getElementById('swal-category').value;
      const image = document.getElementById('swal-image').files[0];

      if (!name || !slug || !price || !category_id) {
        Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin bắt buộc.');
        return false;
      }
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) {
        Swal.showValidationMessage('Slug chỉ được chứa chữ thường, số và dấu gạch ngang!');
        return false;
      }
      if (price < 0) {
        Swal.showValidationMessage('Giá không được âm!');
        return false;
      }
      return { name, slug, price, description, category_id, image };
    },
  });

  if (formValues) {
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('slug', formValues.slug);
      formData.append('price', formValues.price);
      formData.append('description', formValues.description);
      formData.append('category_id', formValues.category_id);
      if (formValues.image) {
        formData.append('image', formValues.image);
      }

      const res = await axios.put(`http://localhost:3000/api/products/${product.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const index = products.value.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products.value[index] = res.data;
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật sản phẩm thành công!',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể cập nhật sản phẩm!',
        text: error.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

const deleteProduct = async (id) => {
  const result = await Swal.fire({
    title: 'Xóa sản phẩm',
    text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
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
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      products.value = products.value.filter(p => p.id !== id);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Xóa sản phẩm thành công!',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể xóa sản phẩm!',
        text: error.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.tw-container {
  max-width: 1200px;
}
</style>