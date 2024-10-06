// import './App.css';
// import Navbar from './Components/Navbar/Navbar';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Shop from './Pages/Shop';
// import ShopCategory from './Pages/ShopCategory';
// import Product from './Pages/Product';
// import Cart from './Pages/Cart';
// import LoginSignup from './Pages/LoginSignup';

// const Layout = () => (
//   <div>
//     <Navbar />
//     <Outlet /> {/* This will render the child route component */}
//   </div>
// );

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Layout />, // Wrap routes in a Layout with Navbar
//       children: [
//         {
//           path: '/',
//           element: <Shop />,
//         },
//         {
//           path: '/mens',
//           element: <ShopCategory category="men" />,
//         },
//         {
//           path: '/womens',
//           element: <ShopCategory category="women" />,
//         },
//         {
//           path: '/kids',
//           element: <ShopCategory category="kid" />,
//         },
//         {
//           path: '/product/:productId',
//           element: <Product />,
//         },
//         {
//           path: '/cart',
//           element: <Cart />,
//         },
//         {
//           path: '/login',
//           element: <LoginSignup />,
//         },
//       ],
//     },
//   ]);

//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default App;


import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Verify from './Components/Verify/Verify';
import MyOrders from './Components/Orders/MyOrders';
import ProtectedRouter from './Components/ProctedRouter/ProtectdRouter';
import ResetPassword from './Pages/ResetPassword';
import ForgetPasswordEmail from './Pages/ForgetPasswordEmail';
import ForgetPassword from './Pages/ForgetPassword';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory category="men" banner={men_banner} />} />
        <Route path="/womens" element={<ShopCategory category="women" banner={women_banner} />} />
        <Route path="/kids" element={<ShopCategory category="kid" banner={kid_banner} />} />
        <Route path="/product" element={<Product />} >
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<ProtectedRouter > <PlaceOrder /> </ProtectedRouter>} />
        <Route path='/verify' element={<ProtectedRouter > <Verify /> </ProtectedRouter>} />
        <Route path='/resetpassword' element={<ProtectedRouter > <ResetPassword /> </ProtectedRouter>} />
        <Route path='/forget-password' element={<ForgetPasswordEmail />} />
        <Route path='/forget-password-page' element={<ForgetPassword />} />
        <Route path='/orders' element={<ProtectedRouter > <MyOrders /> </ProtectedRouter>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

