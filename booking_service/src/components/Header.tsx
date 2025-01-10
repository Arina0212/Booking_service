import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { useAppSelector } from '../hooks';

export default function Header() {
    const authorizationStatus = useAppSelector(getAuthorizationStatus);

    return (
        <header className="header display_none_print">
            <Link to={AppRoute.Main} className="header__logo">
                <img src="/svg/header/logo.svg" alt="наместе" />
            </Link>

            {/*<Link to={AppRoute.Main} className="header__link header__link_active hide-on-mob">
                мероприятия
            </Link>*/}
            {/*<Link to={AppRoute.Teams} className="header__link header__link_mid hide-on-mob">
                команды
            </Link>*/}
            {/* <Link to="" className="header__link hide-on-mob">
                о нас
            </Link>*/}
            {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                    <Link to={AppRoute.Create} className="header__btn hide-on-mob">
                        создать мероприятие
                    </Link>
                    <Link to={AppRoute.Create} className="header__btnMob hide-on-desktop">
                        <img src="/svg/header/create.svg" alt="+" />
                    </Link>

                    {/*<button className="header__notify">
                        <img src="/svg/header/notify.svg" alt="notify" />
                        <span className="header__notify-new"></span>
                    </button>*/}

                    <Link to={AppRoute.Lk} className="header__profile">
                        <img src="/svg/header/profile.svg" alt="profile" />
                    </Link>
                </>
            ) : (
                <Link to={AppRoute.Login} className="header__btn">
                    войти
                </Link>
            )}

            <div className="header__mob display_none_print hide-on-desktop">
                {/*<Link to={AppRoute.Main} className="header__link header__link_active">
                    мероприятия
                </Link>*/}
                {/*<Link to={AppRoute.Teams} className="header__link header__link_mid">
                    команды
                </Link>*/}
                {/* <Link to="" className="header__link">
                    о нас
                </Link>*/}
            </div>
        </header>
    );
}
