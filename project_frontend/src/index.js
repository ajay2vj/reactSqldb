import React from 'react';
import ReactDOM from 'react-dom';
import './input.css';
import App from './App';
import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
const Routing = () => {
  const queryClient = new QueryClient();

  return(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
