import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
})

// Async thunk for fetching a single product
export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
})

// Async thunk for fetching product categories
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
})

const initialState = {
  products: [],
  selectedProduct: null,
  categories: [],
  filteredProducts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProductsByCategory: (state, action) => {
      const category = action.payload
      if (category === "all") {
        state.filteredProducts = state.products
      } else {
        state.filteredProducts = state.products.filter((product) => product.category === category)
      }
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.products = action.payload
        state.filteredProducts = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      // Handle fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ["all", ...action.payload]
      })
  },
})

export const { filterProductsByCategory, clearSelectedProduct } = productSlice.actions
export default productSlice.reducer
