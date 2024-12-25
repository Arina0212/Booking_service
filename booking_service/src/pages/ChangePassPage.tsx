import React, { SetStateAction, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ChangePasswordAction } from '../store/api-actions';
import { redirectToRoute } from '../store/action';
import { AppRoute } from '../const';
import { getLoadingPassword } from '../store/user-process/selectors';
import Spinner from '../components/Spinner';

export default function ChangePassPage() {
    const dispatch = useAppDispatch();

    const isLoadingPassword = useAppSelector(getLoadingPassword);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [inputType, setInputType] = useState('password');
    const [error, setError] = useState('');
    const toggleInput = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };
    const [inputType2, setInputType2] = useState('password');

    const toggleInput2 = () => {
        setInputType2(inputType2 === 'password' ? 'text' : 'password');
    };
    const [inputTypeOld, setInputTypeOld] = useState('password');

    const toggleInputOld = () => {
        setInputTypeOld(inputType2 === 'password' ? 'text' : 'password');
    };

    const [valueNewPass, setValueNewPass] = useState('');
    const [valueConfirmNewPass, setValueConfirmNewPass] = useState('');

    function handleInput(event: { target: { value: SetStateAction<string> } }) {
        setValueNewPass(event.target.value);
    }

    function handleInput2(event: { target: { value: SetStateAction<string> } }) {
        setValueConfirmNewPass(event.target.value);
    }

    const [valueOldPass, setValueOldPass] = useState('');

    function handleInputOldPass(event: { target: { value: SetStateAction<string> } }) {
        setValueOldPass(event.target.value);
    }

    const handleChangePassword = async (event: React.FormEvent) => {
        event.preventDefault();
        if (valueNewPass === valueConfirmNewPass) {
            setError('');
            await dispatch(
                ChangePasswordAction({
                    password: valueConfirmNewPass,
                }),
            );
            dispatch(redirectToRoute(AppRoute.Lk));
        } else {
            setError('Пароли не совпадают');
        }
    };
    return (
        <form className="auth" onSubmit={handleChangePassword}>
            <h1 className="auth__head">Смена пароля</h1>
            <div className="auth__input input_white input_pass">
                <input
                    className="input_white-field input_white-field_pass"
                    placeholder="Старый пароль"
                    id="oldPassword"
                    ref={passwordRef}
                    onChange={handleInputOldPass}
                    type={inputTypeOld}
                    value={valueOldPass}
                    required
                />
                {inputType === 'password' && (
                    <div onClick={toggleInputOld} className="input_white-show input_white-eye input_white-eye_active">
                        <img src="/svg/showPassIcon.svg" alt="show" draggable="false" />
                    </div>
                )}
                {inputType === 'text' && (
                    <div onClick={toggleInputOld} className="input_white-hide input_white-eye">
                        <img src="/svg/hidePassIcon.svg" alt="hide" draggable="false" />
                    </div>
                )}
            </div>
            {error !== '' && <div className="error">{error}</div>}

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
                {isLoadingPassword ? <Spinner /> : 'Изменить пароль'}
            </button>
        </form>
    );
}
