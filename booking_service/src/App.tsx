import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import ChangePassPage from './pages/ChangePassPage';
import { getAuthorizationStatus } from './store/user-process/selectors';
import { useAppSelector } from './hooks';

function App() {
    const auth = useAppSelector(getAuthorizationStatus);

    return (
        <HelmetProvider>
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Events}>
                    <Route path=":id" element={<EventPage />} />
                </Route>
                <Route path={AppRoute.Login} element={<LoginPage />} />
                <Route path={AppRoute.SignIn} element={<SignInPage />} />
                {auth === AuthorizationStatus.Auth && (
                    <>
                        <Route path={AppRoute.Lk}>
                            <Route index element={<ProfilePage />} />
                            <Route path={AppRoute.ChangePass} element={<ChangePassPage />} />
                        </Route>

                        <Route path={AppRoute.Create} element={<CreateEventPage />} />
                    </>
                )}
                {auth !== AuthorizationStatus.Auth && (
                    <>
                        <Route path={AppRoute.Lk} element={<MainPage />} />
                        <Route path={AppRoute.ChangePass} element={<MainPage />} />
                        <Route path={AppRoute.Create} element={<MainPage />} />
                    </>
                )}
            </Routes>
        </HelmetProvider>
    );
}

export default App;
