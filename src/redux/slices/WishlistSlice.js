import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, argFromCmp) => {
      let existingProduct = state.wishlist.find(
        (eachProd) => eachProd.id == argFromCmp.payload.id,
      );
      if (existingProduct) {
        Swal.fire({
          title: "",
          text: "item already exists on WishList",
          icon: "warning",
        });
      } else {
        state.wishlist.push(argFromCmp.payload);
           Swal.fire({
                  title: "Success",
                  text: "item Added to Wishlist",
                  icon: "success",
                });
      }
    },
    removeFromWishlist: (state, idFromComp) => {
      let remainingProducts = state.wishlist.filter(
        (eachProd) => eachProd.id != idFromComp.payload,
      );
      state.wishlist = remainingProducts;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
