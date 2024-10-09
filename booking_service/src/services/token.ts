const AUTH_TOKEN_KEY_NAME = 'BookingService-token';

export type Token = string;

export const getToken = (): Token => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    console.log('getToken: ', token);
    return token ?? '';
};

export const saveToken = (token: Token): void => {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
    console.log('SaveToken: ', token);
};

export const dropToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
