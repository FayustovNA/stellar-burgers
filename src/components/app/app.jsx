import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/action/index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Registration from '../../pages/registration';
import ForgotPassword from '../../pages/forgot-password';
import LogIn from '../../pages/login';
import ResetPassword from '../../pages/reset-password';
import Profile from "../../pages/profile"
import { Routes, Route } from 'react-router-dom';
import StellarBurgerMain from '../../pages/main-page';
import FeedOrders from '../../pages/feed/feed';
import OrderHistory from '../../pages/order-history';
import LayOut from '../../pages/layout-profile';
import NotFound from '../../pages/not-found';
import { ProtectedRoute } from '../../hooks/protected-route';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { UNSET_INGREDIENTS } from '../../services/action/burger-ingredients';
import { MODALWINDOW_CLOSE_ING } from '../../services/action/modal-window';
import { useNavigate } from 'react-router-dom';
import { checkUserAuth } from '../../services/action/auth';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const visitedFogotPage = useSelector(store => store.auth.visitedFogotPage);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch((checkUserAuth()));
  }, [])


  const background = location.state?.locationIngredient || location;

  const handleCloseModal = () => {
    navigate('/')
    dispatch({
      type: UNSET_INGREDIENTS,
    })
    dispatch({
      type: MODALWINDOW_CLOSE_ING
    })
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.mainorderbox}>
        <DndProvider backend={HTML5Backend}>

          <Routes location={background}>

            <Route path='/' element={<StellarBurgerMain />} />
            <Route path='login' element={<ProtectedRoute isUnAuth={true}><LogIn /></ProtectedRoute>} />
            <Route path='register' element={<ProtectedRoute isUnAuth={true}><Registration /></ProtectedRoute>} />
            <Route path='forgot-password' element={<ProtectedRoute isUnAuth={true}><ForgotPassword /></ProtectedRoute>} />
            {visitedFogotPage && <Route path='/reset-password' element={<ProtectedRoute isUnAuth={true}><ResetPassword /></ProtectedRoute>} />}

            <Route path='/' element={
              <ProtectedRoute>
                <LayOut />
              </ProtectedRoute>
            }>
              <Route index path='profile' element={<Profile />} />
              <Route path='profile/order-history' element={<OrderHistory />} />
            </Route>

            <Route path='feed' element={<FeedOrders />} />
            <Route path='ingredients/:id' element={<IngredientDetails />} />
            <Route path='*' element={<NotFound />} />

          </Routes>

          {location.state?.locationIngredient &&
            (<Routes>
              <Route path='/ingredients/:id'
                element={
                  <Modal
                    onClose={handleCloseModal}>
                    <IngredientDetails />
                  </Modal>} />
            </Routes>)}

        </DndProvider>
      </main>
    </div >
  );
}

export default App;
