import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './slices/ProductSlice'
import CartSlice from './slices/CartSlice'
import WishlistSlice from './slices/WishlistSlice'


const store = configureStore({
    reducer: {
        productReducer: ProductSlice,
        cartReducer: CartSlice,
        wishlistReducer: WishlistSlice
    }
})

export default store