import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

export default function Header() {
    return (
        <header className="header">
            <Link to="" className="header__logo">
                <img src="/svg/header/logo.svg" alt="наместе" />
            </Link>

            <Link to={AppRoute.Main} className="header__link header__link_active hide-on-mob">
                мероприятия
            </Link>
            <Link to="" className="header__link header__link_mid hide-on-mob">
                команды
            </Link>
            <Link to="" className="header__link hide-on-mob">
                о нас
            </Link>

            <Link to="" className="header__btn hide-on-mob">
                создать
            </Link>
            <Link to="" className="header__btnMob hide-on-desktop">
                <img src="/svg/header/create.svg" alt="+" />
            </Link>

            <button className="header__notify">
                <img src="/svg/header/notify.svg" alt="notify" />
                <span className="header__notify-new"></span>
            </button>

            <Link to={AppRoute.Login} className="header__profile">
                <img src="/svg/header/profile.svg" alt="profile" />
            </Link>

            <div className="header__mob hide-on-desktop">
                <Link to="main.html" className="header__link header__link_active">
                    мероприятия
                </Link>
                <Link to="" className="header__link header__link_mid">
                    команды
                </Link>
                <Link to="" className="header__link">
                    о нас
                </Link>
            </div>
        </header>
    );
}
