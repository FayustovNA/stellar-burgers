import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  const getData = async () => {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`)
      }
      const data = await res.json()
      setIngredients(data.data)
    } catch (error) {
      console.log('Возникла проблема с вашим fetch запросом', error);
    }
  }

  React.useEffect(() => {
    getData();
  }, [])


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.mainorderbox}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
