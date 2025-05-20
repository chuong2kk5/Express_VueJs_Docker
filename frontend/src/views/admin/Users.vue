<template>
  <AdminLayout>
    <div class="tw-container tw-mx-auto tw-p-4 sm:tw-p-6">
      <!-- Header -->
      <div class="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center tw-mb-6 tw-gap-4">
        <h1 class="tw-text-2xl sm:tw-text-3xl tw-font-semibold tw-text-gray-800">Danh sách người dùng</h1>
        <button
          @click="addUser"
          class="tw-bg-blue-600 tw-text-white tw-px-4 sm:tw-px-6 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-blue-700 tw-transition tw-duration-300 tw-flex tw-items-center tw-gap-2"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Thêm người dùng
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
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Email</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Ảnh</th>
                <th class="tw-px-4 sm:tw-px-6 tw-py-3 tw-text-left tw-text-sm tw-font-semibold tw-text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
                class="tw-border-b tw-border-gray-200 hover:tw-bg-gray-50 tw-transition tw-duration-150"
              >
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ user.id }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ user.name }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-text-sm tw-text-gray-600">{{ user.email }}</td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4">
                  <img
                    v-if="user.avatar"
                    :src="user.avatar"
                    alt="User Image"
                    class="tw-w-12 tw-h-12 tw-object-cover tw-rounded-full tw-border tw-border-gray-200"
                  />
                  <span v-else class="tw-text-sm tw-text-gray-500">Chưa có ảnh</span>
                </td>
                <td class="tw-px-4 sm:tw-px-6 tw-py-4 tw-flex tw-gap-2">
                  <button
                    @click="editUser(user)"
                    class="tw-bg-yellow-500 tw-text-white tw-px-3 sm:tw-px-4 tw-py-1.5 tw-rounded-lg tw-font-medium hover:tw-bg-yellow-600 tw-transition tw-duration-300"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deleteUser(user.id)"
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

const users = ref([]);
const loading = ref(false);
const error = ref('');

const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await axios.get('http://localhost:3000/api/users');
    users.value = res.data;
  } catch (err) {
    error.value = 'Không thể tải danh sách người dùng.';
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Lỗi',
      text: 'Không thể tải danh sách người dùng.',
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    loading.value = false;
  }
};

const addUser = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Thêm người dùng mới',
    html: `
      <form id="swal-form" style="display: flex; flex-direction: column; gap: 12px; padding: 0 10px;">
        <input id="swal-input1" class="swal2-input" placeholder="Tên" required>
        <input id="swal-input2" class="swal2-input" placeholder="Email" type="email" required>
        <input id="swal-input3" class="swal2-input" placeholder="Mật khẩu" type="password" minlength="6" required>
        <input 
          id="swal-input4" 
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
      const fileInput = document.getElementById('swal-input4');
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

      document.getElementById('swal-input1').focus();
    },
    preConfirm: () => {
      const form = document.getElementById('swal-form');
      const name = form['swal-input1'].value.trim();
      const email = form['swal-input2'].value.trim();
      const password = form['swal-input3'].value;
      const image = document.getElementById('swal-input4').files[0];

      if (!name || !email || !password) {
        Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin và hợp lệ!');
        return false;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage('Vui lòng nhập email hợp lệ!');
        return false;
      }

      if (password.length < 6) {
        Swal.showValidationMessage('Mật khẩu phải ít nhất 6 ký tự!');
        return false;
      }

      return { name, email, password, image };
    },
  });

  if (formValues) {
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('password', formValues.password);
      if (formValues.image) {
        formData.append('avatar', formValues.image);
      }

      const res = await axios.post('http://localhost:3000/api/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      users.value.push(res.data);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Thêm người dùng mới thành công!',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Không thể thêm người dùng!',
        text: error.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }
};

const editUser = async (user) => {
  const { value: formValues } = await Swal.fire({
    title: 'Sửa người dùng',
    html: `
      <form id="swal-form" style="display: flex; flex-direction: column; gap: 12px; padding: 0 10px;">
        <input id="swal-input1" class="swal2-input" placeholder="Tên" value="${user.name}" readonly>
        <input id="swal-input2" class="swal2-input" placeholder="Email" type="email" value="${user.email}" readonly>
        <input id="swal-input3" class="swal2-input" placeholder="Mật khẩu mới (để trống nếu không đổi)" type="password">
        <input 
          id="swal-input4" 
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
      const fileInput = document.getElementById('swal-input4');
      const fileNameDisplay = document.getElementById('file-name');

      let imgPreview = document.createElement('img');
      imgPreview.style.maxWidth = '100px';
      imgPreview.style.maxHeight = '100px';
      imgPreview.style.margin = '10px auto';
      imgPreview.style.display = 'block';
      imgPreview.style.borderRadius = '8px';
      imgPreview.style.objectFit = 'cover';
      if (user.avatar) imgPreview.src = user.avatar;
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
          imgPreview.src = user.avatar || '';
        }
      });
    },
    preConfirm: () => {
      const name = document.getElementById('swal-input1').value;
      const email = document.getElementById('swal-input2').value;
      const password = document.getElementById('swal-input3').value;
      const file = document.getElementById('swal-input4').files[0];

      if (!name || !email) {
        Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin và hợp lệ!');
        return false;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage('Vui lòng nhập email hợp lệ!');
        return false;
      }

      if (password && password.length < 6) {
        Swal.showValidationMessage('Mật khẩu phải ít nhất 6 ký tự!');
        return false;
      }

      return { name, email, password, file };
    },
  });

  if (formValues) {
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      if (formValues.password) formData.append('password', formValues.password);
      if (formValues.file) formData.append('avatar', formValues.file);

      const res = await axios.put(`http://localhost:3000/api/users/${user.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const idx = users.value.findIndex((u) => u.id === user.id);
      if (idx !== -1) users.value[idx] = res.data;

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật người dùng thành công',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Lỗi khi cập nhật',
        text: error.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }
};

const deleteUser = async (id) => {
  const result = await Swal.fire({
    title: 'Xóa người dùng',
    text: 'Bạn có chắc chắn muốn xóa người dùng này?',
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
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      users.value = users.value.filter((u) => u.id !== id);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Xóa người dùng thành công!',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Xóa thất bại!',
        text: err.response?.data?.error || 'Lỗi không xác định',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.tw-container {
  max-width: 1200px;
}
</style>