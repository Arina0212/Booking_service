export enum NameSpace {
    User = 'USER',
    Event = 'EVENT',
}

export enum APIRoute {
    SignIn = 'auth/register/',
    Login = 'auth/login/',
    Logout = 'auth/logout/',
    ProfileData = 'profile/me/',
    EditProfilePhoto = 'profile/update-photo',
    Events = 'event/view/',
    MyEvents = 'event/view/my/',
    ParticipateEvents = 'event/view/participate/',
    OtherEvents = 'event/view/other/',
    Event = 'event/',
    Cities = 'event/cities/',
    EventCreate = 'event/create/',
    Filters = 'event/filter',
    Regist = 'event/register/',
    OnlineLink = 'event/change-online-link',
}

export enum AppRoute {
    Main = '/',
    SignIn = '/signIn',
    Login = '/login',
    Events = '/events',
    Lk = '/lk',
    Create = '/create',
    Invite = '/invite',
    ChangePass = 'changePassword',
    Teams = '/teams',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const SingInErrorMessage = {
    Email: 'Введите верный email',
    Password: 'Пароль должен содержать хотя бы одну букву и одну цифру и быть не короче 8 символов',
};

export const MONTH = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const FORMATS = [
    { labelValue: 'все' },
    { labelValue: 'Акселератор' },
    { labelValue: 'Воркшоп' },
    { labelValue: 'Встреча' },
    { labelValue: 'Выставка' },
    { labelValue: 'День открытых дверей' },
    { labelValue: 'Конференция' },
    { labelValue: 'Круглый стол' },
    { labelValue: 'Лекция' },
    { labelValue: 'Мастер-класс' },
    { labelValue: 'Метода' },
    { labelValue: 'Митап' },
    { labelValue: 'Панельная дискуссия' },
    { labelValue: 'Питч' },
    { labelValue: 'Семинар' },
    { labelValue: 'Соревнование' },
    { labelValue: 'Собрание' },
    { labelValue: 'Стратегическая сессия' },
    { labelValue: 'Форсайт' },
    { labelValue: 'Форум' },
    { labelValue: 'Хакатон' },
];
