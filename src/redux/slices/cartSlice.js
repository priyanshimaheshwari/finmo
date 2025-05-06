import { createSlice } from "@reduxjs/toolkit"

// Load cart from localStorage
const loadCart = () => {
  try {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error("Error loading cart from localStorage:", error)
    return []
  }
}

const initialState = {
  items: loadCart(),
  totalQuantity: loadCart().reduce((total, item) => total + item.quantity, 0),
  totalAmount: loadCart().reduce((total, item) => total + item.price * item.quantity, 0),
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...newItem, quantity: 1 })
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)

      if (item) {
        item.quantity = quantity
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
