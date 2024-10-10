import { Link } from 'react-router-dom';
import { AppRoute, SingInErrorMessage } from '../const';
import { FormEvent, SetStateAction, useRef, useState } from 'react';
import { SignInAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getEmailError } from '../store/user-process/selectors';

export default function SigninPage() {
    const error_api = useAppSelector(getEmailError);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [inputType, setInputType] = useState('password');
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();

    const toggleInput = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };
    const [inputType2, setInputType2] = useState('password');

    const toggleInput2 = () => {
        setInputType2(inputType2 === 'password' ? 'text' : 'password');
    };

    const [valueNewPass, setValueNewPass] = useState('');
    const [valueConfirmNewPass, setValueConfirmNewPass] = useState('');

    function handleInput(event: { target: { value: SetStateAction<string> } }) {
        setValueNewPass(event.target.value);
    }

    function handleInput2(event: { target: { value: SetStateAction<string> } }) {
        setValueConfirmNewPass(event.target.value);
    }

    const containsAnyLetters = (password: string) => /[a-z]+/i.test(password);
    const containsAnyNumbers = (password: string) => /[0-9]+/i.test(password);
    const isValidEmail = (email: string) => /^[\w-\\.]+@+[\w-]+\.[a-z]{2,4}$/i.test(email);

    const handlerSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (emailRef.current && passwordRef.current) {
            if (!isValidEmail(emailRef.current.value)) {
                setError(SingInErrorMessage.Email);
            } else if (
                !containsAnyLetters(passwordRef.current.value) ||
                !containsAnyNumbers(passwordRef.current.value) ||
                passwordRef.current.value.length < 8
            ) {
                setError(SingInErrorMessage.Password);
            } else if (valueNewPass !== valueConfirmNewPass) {
                setError('Пароли должны совпадать');
            } else {
                dispatch(
                    SignInAction({
                        password: passwordRef.current.value,
                        email: emailRef.current.value,
                    }),
                );
            }
        }
    };
    return (
        <>
            <header className="header"></header>

            <form className="auth" onSubmit={handlerSubmitForm}>
                <h1 className="auth__head">Регистрация</h1>
                <div className="login__message">
                    <p>{error}</p>
                    <p>{error_api}</p>
                </div>

                <div className="auth__input input_white">
                    <input className="input_white-field" ref={emailRef} type="email" placeholder="Почта" />
                </div>

                <div className="auth__input input_white input_pass">
                    <input
                        className="input_white-field input_white-field_pass"
                        placeholder="Пароль"
                        id="newPassword"
                        ref={passwordRef}
                        onChange={handleInput}
                        type={inputType}
                        value={valueNewPass}
                        required
                    />
                    {inputType === 'password' && (
                        <div onClick={toggleInput} className="input_white-show input_white-eye input_white-eye_active">
                            <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                        </div>
                    )}
                    {inputType === 'text' && (
                        <div onClick={toggleInput} className="input_white-hide input_white-eye">
                            <img src="/svg/hidePassIcon.svg" alt="hide" draggable="false" />
                        </div>
                    )}
                </div>
                <div className="auth__input input_white input_pass">
                    <input
                        className="input_white-field input_white-field_pass"
                        placeholder="Повторите пароль"
                        id="confirmNewPassword"
                        ref={passwordRef}
                        onChange={handleInput2}
                        type={inputType2}
                        value={valueConfirmNewPass}
                        required
                    />
                    {inputType2 === 'password' && (
                        <div onClick={toggleInput2} className="input_white-show input_white-eye input_white-eye_active">
                            <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                        </div>
                    )}
                    {inputType2 === 'text' && (
                        <div onClick={toggleInput2} className="input_white-hide input_white-eye">
                            <img src="/svg/hidePassIcon.svg" alt="hide" draggable="false" />
                        </div>
                    )}
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
