import './App.css';
import React, { useEffect } from 'react';
import Routers from './Routers';
import { isLogin, auth } from './components/config/user';

const styles = {
  App: {
    height: '100vh',
    margin: 0,
    padding: 0,
  },
};

function App() {
  const [isLoginValue, setIsLoginValue] = React.useState(false);
  useEffect(() => {
    console.log('App.js:', sessionStorage.getItem('isLogin'));
    if (sessionStorage.getItem('isLogin') === null || sessionStorage.getItem('isLogin') === 'false') {
      sessionStorage.setItem('isLogin', false);
    } else {
      sessionStorage.setItem('isLogin', true);
      setIsLoginValue(true);
    }
  }, []);
  const [login, setLogin] = React.useState(isLoginValue);
  const [user, setUser] = React.useState({ name: '', userID: '' });
  // useMemoを使うことで、コンポーネントの再レンダリングを防ぐことができる
  const providerIsLoginValue = React.useMemo(() => ({ login, setLogin }), [login, setLogin]);
  const providerAuthValue = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <isLogin.Provider value={providerIsLoginValue}>
      <auth.Provider value={providerAuthValue}>
        <div className="App" style={styles.App}>
          <Routers />
        </div>
      </auth.Provider>
    </isLogin.Provider>
  );
}

export default App;
