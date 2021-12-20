import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import FoodsScreen from "./screens/FoodsScreen";
import RoomsScreen from "./screens/RoomsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TestScreen from "./screens/TestScreen";
import KhaltiScreen from "./screens/KhaltiScreen";
// import ProductListScreen from "./screens/ProductListScreen";
import FoodListScreen from "./screens/FoodListScreen";
import RoomListScreen from "./screens/RoomListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/foods" component={FoodsScreen} />
          <Route path="/rooms" component={RoomsScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/foodList" component={FoodListScreen} />
          <Route path="/admin/roomList" component={RoomListScreen} />
          <Route path="/admin/orderList" component={OrderListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/test" component={TestScreen} />
          <Route path="/khalti" component={KhaltiScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
