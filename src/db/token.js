const TOKEN = 'token';

export default class TokenStorage {
    getToken() {
        return localStorage.getItem(TOKEN);
    }
}