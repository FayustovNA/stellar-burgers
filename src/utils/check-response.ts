export const mainUrl = 'https://norma.nomoreparties.space/api';
export const wsUrlAll = 'wss://norma.nomoreparties.space/orders/all';
export const wsUrlProfile = 'wss://norma.nomoreparties.space/orders';


export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

