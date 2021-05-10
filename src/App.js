import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
	Home,
	Products,
	SingleProduct,
	About,
	AuthWrapper,
	PrivateRoute,
	CartPage,
	Checkout,
	ErrorPage,
} from "./pages";

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/products">
						<Products />
					</Route>
					<Route exact path="/products/:id" children={<SingleProduct />}>
						<SingleProduct />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
					<Route exact path="/cartpage">
						<CartPage />
					</Route>
					<PrivateRoute exact path="/checkout">
						<Checkout />
					</PrivateRoute>
					<Route exact path="*">
						<ErrorPage />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</AuthWrapper>
	);
}

export default App;
