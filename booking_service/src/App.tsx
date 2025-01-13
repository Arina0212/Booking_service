import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import ChangePassPage from './pages/ChangePassPage';
import { getAuthorizationStatus } from './store/user-process/selectors';
import { useAppSelector } from './hooks';
import TeamsPage from './pages/TeamsPage';
import InvitePage from './pages/InvitePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import EditEventPage from './pages/EditEventPage';

function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const auth = useAppSelector(getAuthorizationStatus);

    return (
        <HelmetProvider>
            <ToastContainer position="top-right" />
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Events}>
                    <Route path=":id">
                        <Route index={true} element={<EventPage />}></Route>
                        <Route path="edit" element={<EditEventPage />} />
                    </Route>
                </Route>
                <Route path={AppRoute.Login} element={<LoginPage />} />
                <Route path={AppRoute.SignIn} element={<SignInPage />} />
                <Route path={AppRoute.Teams} element={<TeamsPage />} />
                {/*{auth === AuthorizationStatus.Auth && (
                    <>*/}
                <Route path={AppRoute.Lk}>
                    <Route index element={<ProfilePage />} />
                    <Route path={AppRoute.ChangePass} element={<ChangePassPage />} />
                </Route>

                <Route path={AppRoute.Create} element={<CreateEventPage />} />
                <Route path={AppRoute.Invite} element={<InvitePage />} />
                {/*</>
                )}*/}
                {/*{auth !== AuthorizationStatus.Auth && (
                    <>
                        <Route path={AppRoute.Lk} element={<MainPage />} />
                        <Route path={AppRoute.ChangePass} element={<MainPage />} />
                        <Route path={AppRoute.Create} element={<MainPage />} />
                    </>
                )}*/}
            </Routes>
        </HelmetProvider>
    );
}

export default App;
