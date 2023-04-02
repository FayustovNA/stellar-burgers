import React from 'react';
import styles from './app.module.css';
import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/action/index';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import LogIn from '../../pages/login/login';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from "../../pages/profile/profile"
import { Routes, Route } from 'react-router-dom';
import StellarBurgerMain from '../../pages/main-page';
import FeedOrders from '../../pages/feed/feed';
import OrderHistory from '../../pages/order-history/order-history';
import LayOut from '../../pages/layout-profile/layout-profile';
import NotFound from '../../pages/not-found/not-found';
import ProtectedRoute from '../../hooks/protected-route';
import { useLocation } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { UNSET_INGREDIENTS } from '../../services/constans/burger-ingredients';
import { MODALWINDOW_CLOSE_ING } from '../../services/constans/modal-window';
import { useNavigate } from 'react-router-dom';
import { checkUserAuth } from '../../services/action/auth';
import FeedOrderModalCard from '../feed-order-modal-card/feed-order-modal-card';
import OrderFullPage from '../../pages/order-full-page/order-full-page';
import HistoryOrderModalCard from '../history-order-modal-card/history-order-modal-card';
import OrderHistoryFullPage from '../../pages/order-full-page/order-history-full-page';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background =
    location.state?.locationIngredient ||
    location.state?.locationFeed ||
    location.state?.locationOrderHistory ||
    location;

  const visitedFogotPage = useSelector(store => store.auth.visitedFogotPage);


  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [])


  const handleCloseModal = () => {
    navigate(-1)
    dispatch({
      type: UNSET_INGREDIENTS,
    })
    dispatch({
      type: MODALWINDOW_CLOSE_ING
    })
  }

  return (
    <div className={styles.app} >
      <AppHeader />
      <main className={styles.mainorderbox} >
        <DndProvider backend={HTML5Backend}>

          <Routes location={background}>

            <Route path='/' element={< StellarBurgerMain />} />

            < Route path='/login' element={<ProtectedRoute isUnAuth={true} > <LogIn /></ProtectedRoute >} />
            < Route path='/register' element={<ProtectedRoute isUnAuth={true} > <Registration /></ProtectedRoute >} />
            < Route path='/forgot-password' element={<ProtectedRoute isUnAuth={true} > <ForgotPassword /></ProtectedRoute >} />
            {visitedFogotPage && <Route path='/reset-password' element={<ProtectedRoute isUnAuth={true} > <ResetPassword /></ProtectedRoute >} />}

            < Route path='/' element={
              < ProtectedRoute isUnAuth={false} >
                <LayOut />
              </ProtectedRoute>}>
              <Route index path='profile' element={< Profile />} />
              < Route path='profile/order-history' element={< OrderHistory />} />
            </Route>

            < Route path='profile/order-history/:id' element={< ProtectedRoute isUnAuth={false} > <OrderHistoryFullPage /></ProtectedRoute >} />

            < Route path='feed' element={< FeedOrders />} />
            < Route path='/feed/:id' element={< OrderFullPage />} />

            < Route path='ingredients/:id' element={< IngredientDetails />} />
            < Route path='*' element={< NotFound />} />

          </Routes>

          {
            location.state?.locationIngredient &&
            (<Routes>
              <Route path='/ingredients/:id'
                element={
                  < Modal
                    onClose={handleCloseModal} >
                    <IngredientDetails />
                  </Modal>} />
            </Routes>)}

          {
            location.state?.locationFeed &&
            (<Routes>
              <Route path='/feed/:id'
                element={
                  < Modal
                    onClose={handleCloseModal} >
                    <FeedOrderModalCard />
                  </Modal>} />
            </Routes>)}

          {
            location.state?.locationOrderHistory &&
            (<Routes>
              <Route path='/profile/order-history/:id'
                element={
                  < Modal
                    onClose={handleCloseModal} >
                    <HistoryOrderModalCard />
                  </Modal>} />
            </Routes>)}

        </DndProvider>
      </main>
    </div>);
};

export default App;
