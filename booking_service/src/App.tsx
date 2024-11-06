import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import EventPage from './pages/EventPage';

function App() {
    return (
        <HelmetProvider>
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Login} element={<LoginPage />} />
                <Route path={AppRoute.SignIn} element={<SigninPage />} />
                <Route path={AppRoute.Event} element={<EventPage />} />
            </Routes>
        </HelmetProvider>
    );
}

export default App;
