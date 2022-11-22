import { Route, Routes } from 'react-router-dom';
import ApplicationPage from './pages/Application';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
