import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { CartProvider } from './components/CartContext';
import Favorites from './components/Favorites';
import PrivateRouteFavorites from './components/PrivateRoutes/PrivateRouteFavorites';
import Detail from './components/Detail';
import PrivateRoutePanelAdmin from './components/PrivateRoutes/PrivateRoutePanelAdmin';
import AdminPanel from './components/AdminPanel/AdminPanel';
import UserPanel from './components/UserPanel/UserPanel';
import CartPage from './components/CartPage';

function App() {
  return (
    <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Detail />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRouteFavorites />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route path="/panel/admin/:id"
            element={
              <PrivateRoutePanelAdmin>
                <AdminPanel/>
              </PrivateRoutePanelAdmin>
            }
          />
          <Route path='/panel/user/:id' element={<UserPanel />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
    </CartProvider>
  );
}

export default App;