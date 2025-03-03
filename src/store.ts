import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./components/ingredients/ingredientsListSlice";
import disheshReducer from "./components/dishes/dishesListSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';


const ingredientsPersistConfig = {
	key: 'ingredientsList',
	storage
}
const dishesPersistConfig = {
	key: 'dishesList',
	storage
}

const rootReducer = combineReducers({
	ingredients: persistReducer(ingredientsPersistConfig, ingredientsReducer),
	dishes: persistReducer(dishesPersistConfig, disheshReducer)
})

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [
				FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
			]
		}
	})


})
export type RootState = ReturnType<typeof rootReducer>;

const persistor = persistStore(store)

export { store, persistor }