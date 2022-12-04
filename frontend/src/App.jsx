import { Route, Routes } from 'react-router-dom';
import Deal from './pages/Deal';
import Description from './pages/Description';
// import ApplicationPage from './pages/Application';
import LoginPage from './pages/Login/index';
import Register from './pages/Register';
// import MainPage from './pages/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<MainPage />} />
        <Route path="/application" element={<ApplicationPage />} /> */}
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />}/>
        <Route path="/Description" element={<Description />}/>
        <Route path='/Deal' element={<Deal />}/>
      </Routes>
    </div>
  );
}

export default App;
