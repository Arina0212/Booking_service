import { Link } from 'react-router-dom';
import { AppRoute, SingInErrorMessage } from '../const';
import { FormEvent, useRef, useState } from 'react';
import { loginAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getError } from '../store/user-process/selectors';

export default function LoginPage() {
    const [inputType, setInputType] = useState('password');

    const toggleInput = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };
    const error_api = useAppSelector(getError);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState('');
    const [password, setPassword] = useState<string | null>(null);

    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    console.log(isErrorEmail, isErrorPassword);
    const dispatch = useAppDispatch();

    const containsAnyLetters = (password: string) => /[a-z]+/i.test(password);
    const containsAnyNumbers = (password: string) => /[0-9]+/i.test(password);
    const isValidEmail = (email: string) => /^[\w-\\.]+@+[\w-]+\.[a-z]{2,4}$/i.test(email);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (emailRef.current && passwordRef.current) {
            if (!isValidEmail(emailRef.current.value)) {
                setError(SingInErrorMessage.Email);
                setIsErrorEmail(true);
            } else if (!containsAnyLetters(passwordRef.current.value) || !containsAnyNumbers(passwordRef.current.value)) {
                setError(SingInErrorMessage.Password);
                setIsErrorPassword(true);
            } else {
                dispatch(
                    loginAction({
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                    }),
                );
            }
        }
    };
    return (
        <>
            <header className="header"></header>

            <form className="auth" onSubmit={handleSubmit}>
                <h1 className="auth__head">Вход</h1>
                <div className="login__message">
                    <p>{error}</p>
                    <p>{error_api}</p>
                </div>

                <div className="auth__input input_white">
                    <input className="input_white-field" type="email" placeholder="Почта" ref={emailRef} required />
                </div>

                <div className="auth__input input_white">
                    <input
                        className="input_white-field input_white-field_pass"
                        value={password ?? ''}
                        onChange={(evt) => setPassword(evt.target.value)}
                        type={inputType}
                        name="Password"
                        id="authPassword"
                        placeholder="Пароль"
                        ref={passwordRef}
                        required
                    />
                    {}
                    <div onClick={toggleInput} className="input_white-show input_white-eye input_white-eye_active">
                        <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                    </div>
                    <div onClick={toggleInput} className="input_white-hide input_white-eye">
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
            </form>
        </>
    );
}
