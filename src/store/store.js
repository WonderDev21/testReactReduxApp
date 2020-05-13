import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import createSagaMiddleware from 'redux-saga';
import { parse, stringify } from 'flatted/esm';

import rootReducers from './reducers'; // where reducers is a object of reducers
import rootSaga from './sagas';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['weather'],
  transforms: [transformCircular],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const enhancers = [applyMiddleware(...middleware)];
const initialState = {};
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(...enhancers)
);
const persistor = persistStore(store);
const configureStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(rootSaga);

export default configureStore;
