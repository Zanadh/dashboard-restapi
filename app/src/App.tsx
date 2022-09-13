import './App.css';
import AppRoutes from './routes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

function App() {
  return (
    <PersistGate loading={<div>Persist Loading.. </div>} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  );
}
export default App;
