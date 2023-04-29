import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
  legacy_createStore,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
// Pass it as a middleware then add thunk
const middleWares = [logger, sagaMiddleware];

const composeEnhancer =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));


//root-reducer
export const store = legacy_createStore(persistedReducer, composeEnhancers);
export const persistor = persistStore(store);

// Then run the saga
sagaMiddleware.run(rootSaga);