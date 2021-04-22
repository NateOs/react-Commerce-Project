import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
	const { filter_products: products, grid_view } = useFilterContext();
	console.log(products);

	if (products.length < 1) {
		return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search...</h5>;
	}
	if (grid_view === false) {
		return <ListView products={products} />;
	}
	return <GridView products={products}>stuff</GridView>;
};

export default ProductList;
