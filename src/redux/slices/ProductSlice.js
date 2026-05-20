import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getProductData = createAsyncThunk('products/getData', async () => {
    let result = await axios.get('https://dummyjson.com/products')
    return result.data.products
})

export const getSinleProductData = createAsyncThunk('products/getSingleProduct', async (id) => {
    let result = await axios.get(`https://dummyjson.com/products/${id}`)
    return result.data
})


const ProductSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: true,
        error: "",
        single_product: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getProductData.pending, (state) => {
            state.products = [],
                state.loading = true,
                state.error = ''
        }),
            builder.addCase(getProductData.fulfilled, (state, apiResponse) => {
                state.products = apiResponse.payload,
                    state.loading = false,
                    state.error = ''
            }),
            builder.addCase(getProductData.rejected, (state) => {
                state.products = [],
                    state.loading = false,
                    state.error = 'Something went wrong while calling API'
            }),
            builder.addCase(getSinleProductData.pending, (state) => {
                state.loading = true,
                    state.error = '',
                    state.single_product = {}
            }),
            builder.addCase(getSinleProductData.fulfilled, (state, result) => {
                state.loading = false,
                    state.error = '',
                    state.single_product = result.payload
            }),
            builder.addCase(getSinleProductData.rejected, (state) => {
                state.loading = false,
                    state.error = 'something went wrong',
                    state.single_product = {}
            })
    }
})

export default ProductSlice.reducer