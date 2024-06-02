import { SOCKET_UPDATE } from '../constant/socketConstant/socket.constant';


export const socketReducer = (state = {socket:null },action) => {
    switch (action.type) {
        case SOCKET_UPDATE:
            console.log("--------")
            console.log(action)
            return{
                ...state,
                socket:action.payload.socket
            }

        default:
            return state;
    }
};