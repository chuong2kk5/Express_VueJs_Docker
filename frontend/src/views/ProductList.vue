<template>
  <div class="product-list">
    <h1 class="title">Danh sách sản phẩm</h1>
    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <img
          :src="product.image_url"
          :alt="product.name"
          class="product-image"
        />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price.toLocaleString() }}₫</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        if (!res.ok) throw new Error("Lỗi mạng khi lấy sản phẩm");
        const data = await res.json();
        this.products = data;
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-list {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 5px 15px rgb(0 0 0 / 0.2);
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.product-description {
  flex-grow: 1;
  color: #555;
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.product-price {
  font-weight: 700;
  color: #1e88e5;
  font-size: 1.1rem;
}
</style>
