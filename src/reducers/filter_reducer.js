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
		// this time we dont directly assign the state values to prevent a gotcha, we spread instead
		return { ...state, all_products: [...action.payload], filter_products: [...action.payload] };
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
		const tempProductsFiltered = filter_products;

		if (sort === 'price-lowest') {
			tempProductsFiltered.sort((a, b) => a.price - b.price);
		}
		if (sort === 'price-highest') {
			tempProductsFiltered.sort((a, b) => b.price - a.price);
		}
		if (sort === 'name-a') {
			tempProductsFiltered.sort((a, b) => {
				var nameA = a.name.toUpperCase();
				var nameB = b.name.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
			});
		}
		if (sort === 'name-z') {
			tempProductsFiltered.sort((a, b) => {
				var nameA = a.name.toUpperCase();
				var nameB = b.name.toUpperCase();
				if (nameA > nameB) {
					return -1;
				}
			});
		}
		// if (sort === 'name-z') {
		// 	tempProductsFiltered.sort((a, b) => b.name > a.name);
		// }

		return { ...state, filter_products: tempProductsFiltered };
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
