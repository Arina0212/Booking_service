import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useRef } from 'react';

export default function SigninPage() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    /*    const hendlerSubmitForm =(evt: FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            if (emailRef.current && passwordRef.current) {
                    dispatch(SignInAction({
                        first_name: first_name,
                        last_name: last_name,
                        patronymic: patronymic,
                        password: passwordRef.current.value,
                        email: emailRef.current.value,
                    }));
                }
            }
        };*/
    return (
        <>
            <header className="header"></header>

            <form className="auth">
                <h1 className="auth__head">Регистрация</h1>

                <div className="auth__input input_white">
                    <input className="input_white-field" ref={emailRef} type="email" placeholder="Почта" />
                </div>

                <div className="auth__input input_white input_pass">
                    <input className="input_white-field input_white-field_pass" type="password" placeholder="Пароль" />
                    <div className="input_white-show input_white-eye input_white-eye_active">
                        <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                    </div>
                    <div className="input_white-hide input_white-eye">
                        <img src="/svg/hidePassIcon.svg" alt="hide" draggable="false" />
                    </div>
                </div>
                <div className="auth__input input_white input_pass">
                    <input className="input_white-field input_white-field_pass" type="password" placeholder="Повторите пароль" />
                    <div className="input_white-show input_white-eye input_white-eye_active">
                        <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                    </div>
                    <div className="input_white-hide input_white-eye">
                        <img src="/svg/hidePassIcon.svg" alt="hide" draggable="false" />
                    </div>
                </div>

                <button type="submit" className="auth__btn btn_black">
                    Зарегистрироваться
                </button>

                <p className="auth__text">
                    Есть аккаунт? <Link to={AppRoute.Login}>Войти</Link>
                </p>
            </form>
        </>
    );
}
