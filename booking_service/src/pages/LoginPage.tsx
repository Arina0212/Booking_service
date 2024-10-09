import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

export default function LoginPage() {
    return (
        <>
            <header className="header"></header>

            <section className="auth">
                <h1 className="auth__head">Вход</h1>

                <div className="auth__input input_white">
                    <input className="input_white-field" type="email" placeholder="Почта" />
                </div>

                <div className="auth__input input_white">
                    <input className="input_white-field input_white-field_pass" type="password" placeholder="Пароль" />
                    <div className="input_white-show input_white-eye input_white-eye_active">
                        <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                    </div>
                    <div className="input_white-hide input_white-eye">
                        <img src="/svg/hidePassIcon.svg" alt="hide" draggable="false" />
                    </div>
                </div>

                <Link to="" className="auth__link">
                    Забыли пароль?
                </Link>

                <button className="auth__btn btn_black">Войти</button>

                <p className="auth__text">
                    Нет аккаунта? <Link to={AppRoute.SignIn}>Зарегистрироваться</Link>
                </p>
            </section>
        </>
    );
}
