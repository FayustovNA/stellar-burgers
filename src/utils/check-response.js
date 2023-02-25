
export const mainUrl = 'https://norma.nomoreparties.space/api';
export const wsUrlAll = 'wss://norma.nomoreparties.space/orders/all';

export function checkResponse(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

