import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const fireSwal = (state) => {
  if (state) {
    Swal.fire({
      title: 'Success!',
      text: 'Item Added Successfully!',
      icon: 'success',
      confirmButtonText: 'Done'
    })
  } else {
    Swal.fire({
      title: 'Failure!',
      text: 'Required amount out of stock!',
      icon: 'error',
      confirmButtonText: 'Done'
    })
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.cartItems.find(item => item._id === newItem._id)

      if (existingItem) {
        if (existingItem.quantity < newItem.stock ) {
          existingItem.quantity += 1
          existingItem.totalPrice += newItem.price

          state.totalQuantity += 1
          state.totalPrice += newItem.price

          fireSwal(true)
        } else {
          console.log('Cannot add more, stock limit reached')
          fireSwal(false)
        }
        
      } else {
        if (newItem.stock > 0) {
          state.cartItems.push({
          _id: newItem._id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
          })

          state.totalQuantity += 1
          state.totalPrice += newItem.price
          fireSwal(true)
        } else {
          console.log('Item is out of stock')
          fireSwal(false)
        }
      }
    }, 
    removeItem: (state, action) => {
      const removedItemID = action.payload
      const removedItem = state.cartItems.findIndex(item => item._id === removedItemID)

      state.cartItems = state.cartItems.filter(item => item._id !== removedItemID)

      state.totalQuantity -= 1
      state.totalPrice -= removedItem.price
    },
    clearAll: (state) => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
    removeFromCart: (state, action) => {
      const itemID = action.payload
      const existingItem = state.cartItems.find(item => item._id === itemID) 

      if (existingItem) {
        state.totalPrice -= existingItem.price
        state.totalQuantity -= 1

        existingItem.quantity -= 1
        existingItem.totalPrice -= existingItem.price

        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(item => item._id !== itemID)
        }
      }
    }
  }
})

// console.log(cartSlice)
export const { addToCart, removeFromCart, clearAll } = cartSlice.actions;
export default cartSlice.reducer