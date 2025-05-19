<template>
  <div class="auth-form">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="submitLogin">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mật khẩu</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Đăng nhập</button>
    </form>
    <p>
      Chưa có tài khoản?
        <router-link to="/register" class="text-blue-600 hover:underline">Đăng ký</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitLogin() {
      // Xử lý đăng nhập, ví dụ gọi API
      alert(`Đăng nhập với Email: ${this.email}`);
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
