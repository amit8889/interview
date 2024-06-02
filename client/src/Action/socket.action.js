import {SOCKET_UPDATE} from '../constant/socketConstant/socket.constant';
 
  
  
  //add item to cart
  export const updateSocket = (socket) => async (dispatch) => {
      
        dispatch({
          type: SOCKET_UPDATE,
          payload: {
            socket:socket
          },
        });
      
      };
  
  
      //remove from cart
  
    //   export const removeItemsFromCart = (id) => async (dispatch, getState) => {
       
      
    //     dispatch({
    //       type: REMOVE_CART_ITEM,
    //       payload: id
    //     });
      
    //     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    //   };
  
    //   //save shipping info
    //   export const saveShippingInfo = (data) => async (dispatch) => {
       
      
    //     dispatch({
    //       type: SAVE_SHIPPING_INFO,
    //       payload: data
    //     });
      
    //     localStorage.setItem("shippingInfo", JSON.stringify(data));
    //   };