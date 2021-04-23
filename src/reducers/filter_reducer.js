import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = action.payload.map((p) => p.price);
		maxPrice = Math.max(...maxPrice);

		// this time we dont directly assign the state values to prevent a gotcha, we spread instead
		return {
			...state,
			all_products: [...action.payload],
			filter_products: [...action.payload],
			filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
		};
	}

	if (action.type === SET_GRIDVIEW) {
		return { ...state, grid_view: true };
	}

	if (action.type === SET_LISTVIEW) {
		return { ...state, grid_view: false };
	}

	if (action.type === UPDATE_SORT) {
		return { ...state, sort: action.payload };
	}

	if (action.type === SORT_PRODUCTS) {
		const { sort, filter_products } = state;
		let tempProductsFiltered = [...filter_products];

		if (sort === 'price-lowest') {
			tempProductsFiltered = tempProductsFiltered.sort((a, b) => a.price - b.price);
		}
		if (sort === 'price-highest') {
			tempProductsFiltered = tempProductsFiltered.sort((a, b) => b.price - a.price);
		}
		if (sort === 'name-a') {
			tempProductsFiltered = tempProductsFiltered.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
		}
		if (sort === 'name-z') {
			tempProductsFiltered = tempProductsFiltered.sort((a, b) => {
				return b.name.localeCompare(a.name);
			});
		}

		return { ...state, filter_products: tempProductsFiltered };
	}

	if (action.type === UPDATE_FILTERS) {
		const { name, value } = action.payload;
		return { ...state, filters: { ...state.filters, [name]: value } };
	}

	if (action.type === FILTER_PRODUCTS) {
		console.log('filtering');
		return { ...state, };
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
