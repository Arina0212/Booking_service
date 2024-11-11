export enum NameSpace {
    User = 'USER',
    Event = 'EVENT',
}

export enum APIRoute {
    SignIn = 'auth/register/',
    Login = 'auth/login/',
    Logout = 'auth/logout/',
    ProfileData = 'profile/me/',
    Events = 'event/view/',
    Event = 'event/',
}

export enum AppRoute {
    Main = '/',
    SignIn = '/signin',
    Login = '/login',
    Logout = '/logout',
    Events = '/events',
    Lk = 'lk',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const SingInErrorMessage = {
    Email: 'Введите верный email',
    Password: 'Пароль должен содежать хотя бы одину букву и одну цифру и быть не короче 8 символов',
};
