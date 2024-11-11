import { useAppDispatch } from '../hooks';
import { AppRoute } from '../const';
import { logoutAction } from '../store/api-actions';
import { Link } from 'react-router-dom';

export default function SignOutButton() {
    const dispatch = useAppDispatch();
    return (
        <Link
            to={AppRoute.Main}
            onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
            }}
        >
            Выйти
        </Link>
    );
}
