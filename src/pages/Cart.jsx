import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, emptyCart, increaseCartQuantity, reduceQuantity, removeCartItem } from "../redux/slices/CartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartReducer);

  const [totalAmount,setTotalAmount]= useState(0);


 useEffect(()=>{
  setTotalAmount (cart.reduce((accu,curr)=>accu+curr['totalPrice'],0))
 },[cart])
  

  let dispatch = useDispatch();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-blue-600 text-4xl font-bold mb-10">
        User Cart Summary
      </h1>
      {/* main container */}

      {cart.length > 0 ? (
        <div className="grid grid-cols-[3fr_1fr] gap-8">
          <div className="bg-white rounded-xl  border-slate-200  shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-sm font-semibold  border border-slate-200">
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm">
                {cart.map((eachCart, index) => (
                  <tr className="">
                    <td className="p-4 font-medium">{index + 1}</td>
                    <td className="p-4 font-semibold text-slate-800">
                      {eachCart.title}
                    </td>
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100  border border-slate-200">
                        <img
                          src={eachCart.thumbnail}
                          alt="product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-10">
                        <button disabled={eachCart.quantity==1} onClick={()=> dispatch(reduceQuantity(eachCart.id))} className="text-4xl text-red-500">-</button>
                        <input
                          className="w-10 border-2"
                          type="number"
                          value = {eachCart.quantity}
                          disabled
                        />
                        <button  onClick={() => dispatch(increaseCartQuantity(eachCart))}  className="text-4xl text-green-600">+</button>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-900">
                      {eachCart.price * eachCart.quantity}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => dispatch(removeCartItem(eachCart.id))}
                        className="text-red-500 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={()=>dispatch(emptyCart())} className="bg-red-600 text-1xl text-white rounded p-2 ms-2">Empty Cart</button>
            {/* table and empty cart btn */}
          </div>

          {/* left side */}

          {/* right side  */}
          <div className="border border-slate-200 rounded-xl bg-white p-6 ">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">
              Order Summary
            </h2>

            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-500 text-sm">Total Items: </span>
              <span className="font-semibold text-slate-800">{cart.length}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 text-sm">Total Amount:</span>
              <span className="text-xl font-bold text-slate-900">{totalAmount}</span>
            </div>

            <button onClick={()=>dispatch(emptyCart())} className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl ">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-4xl text-red-700">NO items added</h1>
      )}
    </div>
  );
};

export default Cart;
