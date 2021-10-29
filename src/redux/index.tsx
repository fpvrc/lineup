import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [promiseMiddleware];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store as any);
