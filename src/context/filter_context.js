import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
	filter_products: [],
	all_products: [],
	grid_view: true,
	sort: 'price-lowest',
	filters: {
		text: '',
		company: 'all',
		category: 'all',
		color: 'all',
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
	const { products } = useProductsContext(); //calling the hook to access all products from the products context
	const [state, dispatch] = useReducer(reducer, initialState);

	//* update productStates in filterContext when products changes
	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	//* update sorts state when state.sort changes
	//* update filters state when state.filters changes
	useEffect(() => {
		dispatch({ type: SORT_PRODUCTS });
		dispatch({ type: FILTER_PRODUCTS });
	}, [products, state.sort, state.filters]);

	const setGridView = () => {
		dispatch({ type: SET_GRIDVIEW });
	};

	const setListView = () => {
		dispatch({ type: SET_LISTVIEW });
	};

	//* updates filters object on state
	const updateFilters = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === 'category') {
			//* we grab the text of off the button, so we can assign its value
			value = e.target.textContent;
		}
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
		console.log(name, value);
	};

	const clearFilter = (e) => {
		console.log(e.target.value);
	};

	//* updating the in-state sort value
	const updateSort = (e) => {
		//* for demo
		//* const name = e.target.name
		const value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	return (
		<FilterContext.Provider
			value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};
