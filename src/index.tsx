import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const rootDom = document.getElementById('root');
if (rootDom) {
  const root = ReactDOM.createRoot(rootDom);
  root.render(
    <BrowserRouter>
      <Provider store={store}> 
        <App />
      </Provider>
    </BrowserRouter>,
  );
}

