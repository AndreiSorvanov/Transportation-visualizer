import './App.css';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import { store } from './store';
import { DataLoader } from './components/DataLoader';
import { Content } from './components/Content';


function App() {
  return (
    <Provider store={store}>
      <DataLoader>
        <Header />
        <Content />
      </DataLoader>
    </Provider>
  );
}

export default App;
