import './App.css';
import React from 'react';
import Routers from './Routers';
import { isLogin, auth } from './database/user';

const styles = {
  App: {
    height: '100vh',
    margin: 0,
    padding: 0,
  },
};

function App() {
// useMemoを使うことで、コンポーネントの再レンダリングを防ぐことができる
// sessionStorageにisLoginValueがあるなら取得，ないならfalse
  const isLoginValue = sessionStorage.getItem('isLogin') === 'true';
  const [login, setLogin] = React.useState(isLoginValue);
  const [user, setUser] = React.useState({ name: '' });
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
