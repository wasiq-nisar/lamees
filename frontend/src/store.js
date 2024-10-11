import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Features/Cart/cartSlice'
import productReducer from './Features/Products/productSlice'

import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist' 

// Create a persist configuration for cart
const cartPersistConfig = {
  key: 'cart',  // Key used to persist the cart state in local storage
  storage       // Specify storage type (localStorage in this case)
}

// Wrap cartReducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: persistedCartReducer,   // Use the persisted version of cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions and non-serializable values in actions or state
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // You can also ignore certain paths in state like 'cart.items'
        ignoredPaths: ['cart.register'],
      },
    }),
})

// Create a persistor for your store
export const persistor = persistStore(store);