<template>
  <AdminLayout>
    <div class="tw-p-6">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h1 class="tw-text-2xl tw-font-bold">Danh sách người dùng</h1>
        <button
          @click="addUser"
          class="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-blue-600"
        >
          + Thêm người dùng
        </button>
      </div>

      <table class="tw-w-full tw-border-collapse tw-rounded-lg tw-overflow-hidden tw-shadow-sm">
        <thead class="tw-bg-gray-100">
          <tr>
            <th class="tw-px-4 tw-py-2">ID</th>
            <th class="tw-px-4 tw-py-2">Tên</th>
            <th class="tw-px-4 tw-py-2">Email</th>
            <th class="tw-px-4 tw-py-2">Ảnh</th>
            <th class="tw-px-4 tw-py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="tw-border-b hover:tw-bg-gray-50"
          >
            <td class="tw-px-4 tw-py-2">{{ user.id }}</td>
            <td class="tw-px-4 tw-py-2">{{ user.name }}</td>
            <td class="tw-px-4 tw-py-2">{{ user.email }}</td>
            <td class="tw-px-4 tw-py-2">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                alt="User Image"
                class="tw-w-16 tw-h-16 tw-object-cover tw-rounded-full"
              />
              <span v-else>Chưa có ảnh</span>
            </td>
            <td class="tw-px-4 tw-py-2 tw-space-x-2">
              <button
                @click="editUser(user)"
                class="tw-bg-yellow-400 tw-text-white tw-px-3 tw-py-1 tw-rounded hover:tw-bg-yellow-500"
              >
                Sửa
              </button>
              <button
                @click="deleteUser(user.id)"
                class="tw-bg-red-500 tw-text-white tw-px-3 tw-py-1 tw-rounded hover:tw-bg-red-600"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loading" class="tw-mt-4">Đang tải dữ liệu...</div>
      <div v-if="error" class="tw-mt-4 tw-text-red-500">{{ error }}</div>
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
      timer: 1500
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
          "
        >
        <small id="file-name" style="font-size: 12px; color: #666; text-align: center;">Chưa chọn tệp</small>
      </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Thêm',
    cancelButtonText: 'Hủy',
    didOpen: () => {
      const fileInput = document.getElementById('swal-input4');
      const fileNameDisplay = document.getElementById('file-name');

      // Tạo thẻ img preview ảnh
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
      <input id="swal-input1" class="swal2-input" placeholder="Tên" value="${user.name}" readonly>
      <input id="swal-input2" class="swal2-input" placeholder="Email" type="email" value="${user.email}"readonly>
      <input id="swal-input3" class="swal2-input" placeholder="Mật khẩu mới (để trống nếu không đổi)" type="password">
      <input id="swal-input4" type="file" class="swal2-file" accept="image/*">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return {
        name: document.getElementById('swal-input1').value,
        email: document.getElementById('swal-input2').value,
        password: document.getElementById('swal-input3').value,
        file: document.getElementById('swal-input4').files[0],
      };
    }
  });

  if (formValues) {
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      if (formValues.password) formData.append('password', formValues.password);
      if (formValues.file) formData.append('avatar', formValues.file);

      const res = await axios.put(
        `http://localhost:3000/api/users/${user.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // Cập nhật dữ liệu người dùng trong mảng users
      const idx = users.value.findIndex(u => u.id === user.id);
      if (idx !== -1) users.value[idx] = res.data;

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật người dùng thành công',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi cập nhật',
        text: error.response?.data?.error || 'Lỗi không xác định',
      });
    }
  }
};


const deleteUser = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
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
        position: 'top-end',
          icon: 'success',
          title: 'Thất bại!',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
      });
    }
  }
};

onMounted(fetchUsers);
</script>
 
