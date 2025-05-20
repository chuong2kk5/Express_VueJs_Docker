<template>
  <div class="auth-form">
    <h2>Đăng ký</h2>
    <form @submit.prevent="submitRegister">
      <label for="name">Họ tên</label>
      <input type="text" id="name" v-model="name" required />

      <label for="username">Tên đăng nhập</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mật khẩu</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Đăng ký</button>
    </form>
    <p>
      Đã có tài khoản?
      <router-link to="/login" class="text-blue-600 hover:underline">Đăng Nhập</router-link>
    </p>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async submitRegister() {
      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          Swal.fire('Lỗi đăng ký', errData.error || res.statusText, 'error');
          return;
        }

        const data = await res.json();
          await Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Đăng ký thành công, chuyển hướng đến trang đăng nhập',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });


        this.$router.push('/login');

        // Reset form
        this.name = "";
        this.username = "";
        this.email = "";
        this.password = "";

      } catch (error) {
        Swal.fire('Lỗi kết nối', error.message, 'error');
      }
    },
  },
};
</script>



<style scoped>
.auth-form {
  max-width: 320px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}
.auth-form h2 {
  text-align: center;
  margin-bottom: 16px;
}
.auth-form label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}
.auth-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.auth-form button {
  width: 100%;
  padding: 10px;
  background-color: #1e88e5;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.auth-form button:hover {
  background-color: #1565c0;
}
.auth-form p {
  text-align: center;
  margin-top: 12px;
}
.auth-form a {
  color: #1e88e5;
  cursor: pointer;
  text-decoration: underline;
}
</style>
