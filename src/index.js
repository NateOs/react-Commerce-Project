import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<Auth0Provider
		domain="dev-r5-tir1y.us.auth0.com"
		clientId="9jCcYBkNUESKNbi3klioZ4pCMTsjnN7d"
		redirectUri={window.location.origin}
		cacheLocation={localStorage}>
		<ProductsProvider>
			{/* Wrapping FilterProvider into Products provider allows filterProvider access to products context, where we get all products*/}
			<FilterProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</FilterProvider>
		</ProductsProvider>
	</Auth0Provider>,
	document.getElementById("root"),
);
