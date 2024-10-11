import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async () => {
    const response = await axios.get('http://localhost:4000/api/product/')
    return response.data
  }
)

const initialState = {
    products: [],
    loading: true,
    error: null
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.loading = false
    })
    .addCase(fetchProducts.rejected, (state) => {
      state.loading = false
      state.error = 'Failed to fetch products'
    })
  }
})

export default productSlice.reducer