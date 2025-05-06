import { createSlice } from "@reduxjs/toolkit"

// Load users from localStorage
const loadUsers = () => {
  try {
    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error("Error loading users from localStorage:", error)
    return []
  }
}

// Load current user from localStorage
const loadCurrentUser = () => {
  try {
    const user = localStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Error loading current user from localStorage:", error)
    return null
  }
}

const initialState = {
  users: loadUsers(),
  currentUser: loadCurrentUser(),
  isAuthenticated: !!loadCurrentUser(),
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = action.payload
      // Check if user already exists
      const userExists = state.users.some((user) => user.email === newUser.email)
      if (userExists) {
        state.error = "User with this email already exists"
      } else {
        state.users.push(newUser)
        state.error = null
        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(state.users))
      }
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload
      const user = state.users.find((user) => user.email === email && user.password === password)
      if (user) {
        state.currentUser = { email: user.email, firstName: user.firstName, lastName: user.lastName }
        state.isAuthenticated = true
        state.error = null
        // Save to localStorage
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
      } else {
        state.error = "Invalid Credentials"
      }
    },
    logoutUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.error = null
      // Remove from localStorage
      localStorage.removeItem("currentUser")
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions
export default authSlice.reducer
