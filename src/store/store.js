import { createStore } from 'vuex';
import cart from "@/store/cart"
import auth from "@/store/auth";
import alertMessage from "@/store/alertMessage";

export default createStore({
  modules: {
    cart,
    auth,
    alertMessage
  },
});