import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
    <ProductsProvider>
        {/* Wrapping FilterProvider into Products provider allows access to products context, where we get all products*/}
        <FilterProvider>
            <App />
        </FilterProvider>
    </ProductsProvider>
    , document.getElementById('root'))
