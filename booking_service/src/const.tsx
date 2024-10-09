export enum NameSpace {
    User = 'USER',
}

export enum APIRoute {
    SignIn = 'auth/register/',
    Login = 'auth/login/',
    Logout = 'auth/logout/',
}

export enum AppRoute {
    Main = '/',
    SignIn = '/signin',
    Login = '/login',
    Logout = '/logout',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const SingInErrorMessage = {
    Email: 'Введите верный email',
    Password: 'Пароль должен содежать хотя бы одину букву и одну цифру',
};
