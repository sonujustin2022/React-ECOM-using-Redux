import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
      reducers: {
        addToCart: (state, argFromCmp) => {
            let existingProduct = state.cart.find((eachProd) => eachProd.id == argFromCmp.payload.id)
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;

             let  remainingProducts = state.cart.filter((eachProd)=>eachProd.id !=argFromCmp.payload.id);
                remainingProducts.push(existingProduct);

                state.cart = remainingProducts;
                 alert('incremmented cart products')

            }
            else {
                state.cart.push({...argFromCmp.payload,quantity:1,totalPrice:argFromCmp.payload.price})
                alert('added to Cart')
            }
        },
        removeCartItem: (state, idFromComp) => {
            let remainingProducts = state.cart.filter((eachProd) => eachProd.id != idFromComp.payload)
            state.cart = remainingProducts;
        },

        reduceQuantity:(state,idFromCmp) =>{
            let existingProduct = state.cart.find((eachProd)=> eachProd.id== idFromCmp.payload)

            if(existingProduct){
                existingProduct.quantity -=1;
                   existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
            }
        },
        emptyCart:(state)=>{
            state.cart = [];
        }
    }

})

export default CartSlice.reducer
export const {addToCart,emptyCart,reduceQuantity,removeCartItem} = CartSlice.actions;