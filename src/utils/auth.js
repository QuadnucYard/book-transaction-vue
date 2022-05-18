export function isLogin() {
    if (localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}