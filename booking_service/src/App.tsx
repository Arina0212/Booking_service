import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import MainPage from './pages/MainPage';

function App() {
    return (
        <HelmetProvider>
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Login} element={<LoginPage />} />
                <Route path={AppRoute.SignIn} element={<SigninPage />} />
            </Routes>
        </HelmetProvider>
    );
}

export default App;
