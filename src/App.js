import React from 'react';
import './App.css';
import styles from './components/mainorderbox/mainorderbox.module.css';
import AppHeader from './components/appHeader/appHeader';
import BurgerConstructor from './components/burgerConstructor/burgerConstructor';
import BurgerIngredients from './components/burgerIngredients/burgerIngredients';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  const getData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setIngredients(data.data)
  }

  React.useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <section className={styles.mainorderbox}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </section>
    </div>
  );
}

export default App;
