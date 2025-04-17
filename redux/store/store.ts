import userReducer from "@/redux/slices/userSlice";
import adminReducer from "@/redux/slices/adminSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "admin"],
};

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Persistor for Redux Persist
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
