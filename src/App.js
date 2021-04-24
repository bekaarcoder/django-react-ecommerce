import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersScreen from "./screens/UsersScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductsListScreen from "./screens/ProductsListScreen";

function App() {
    return (
        <Router>
            <Header />
            <Container className="my-3">
                <Route path="/" component={HomeScreen} exact />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/admin/users" component={UsersScreen} />
                <Route
                    path="/admin/user/:id/update"
                    component={UserEditScreen}
                />
                <Route path="/admin/products" component={ProductsListScreen} />
            </Container>
        </Router>
    );
}

export default App;
