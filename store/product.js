import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to create product." };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully!" };
    } catch (error) {
      return { success: false, message: "Server error. Please try again later." };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await res.json();
      set({ products: data.data || [] });
    } catch (error) {
      console.error("Fetch Products Error:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to delete product." };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Server error. Please try again later." };
    }
  },

  updateProduct: async (pid, updatedData) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to update product." };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...updatedData } : product
        ),
      }));

      return { success: true, message: "Product updated successfully!" };
    } catch (error) {
      return { success: false, message: "Server error. Please try again later." };
    }
  },
}));
