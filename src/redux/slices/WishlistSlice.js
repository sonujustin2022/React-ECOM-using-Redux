import { createSlice } from "@reduxjs/toolkit";

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
          title: "Success",
          text: "item Added to Wishlist",
          icon: "success",
        });
      } else {
        state.wishlist.push(argFromCmp.payload);
        Swal.fire({
          title: "Success",
          text: "item Incremented to wishlist",
          icon: "Success",
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
