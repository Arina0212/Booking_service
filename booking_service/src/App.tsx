import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import EventPage from './pages/EventPage';

function App() {
    return (
        <HelmetProvider>
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Events}>
                    <Route path=":id" element={<EventPage />} />
                </Route>
                <Route path={AppRoute.Login} element={<LoginPage />} />
                <Route path={AppRoute.SignIn} element={<SignInPage />} />

                <Route path={AppRoute.Lk} element={<ProfilePage />} />
            </Routes>
        </HelmetProvider>
    );
}

export default App;
