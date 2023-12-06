import Cookies from 'js-cookie';

interface Cookie {
  setValueIntoKey(key: string, value: any): void;
  getValueFromKey(key: string): any;
  setObjectIntoKey(key: string, obj?: {}): void;
  getObjectFromKey(key: string): {} | undefined;
  setAccessToken(token: string): void;
  setRefreshToken(refreshToken: string): void;
  getAccessToken(): string;
  getRefreshToken(): string;
  getLanguage(): string;
  removeAccessToken(): void;
  removeRefreshToken(): void;
  removeLanguage(): void;
}

const cookies: Cookie = {
  setValueIntoKey(key, value) {
    Cookies.set(key, value);
  },
  getValueFromKey(key) {
    return Cookies.get(key);
  },
  setObjectIntoKey(key, obj = {}) {
    Cookies.set(key, JSON.stringify(obj));
  },
  getObjectFromKey(key) {
    return JSON.parse(Cookies.get(key) || '{}');
  },
  setAccessToken(token) {
    this.setValueIntoKey('token', token);
  },
  setRefreshToken(refreshToken) {
    this.setValueIntoKey('refreshToken', refreshToken);
  },
  getAccessToken() {
    const token = this.getValueFromKey('token');
    if (!token) return '';
    return token;
  },
  getRefreshToken() {
    const token = this.getValueFromKey('refreshToken');
    if (!token) return '';
    return token;
  },
  getLanguage() {
    return this.getValueFromKey('lang');
  },
  removeAccessToken() {
    const token = this.getAccessToken();
    if (!token) return null;
    Cookies.remove('token');
  },
  removeRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) return null;
    Cookies.remove('refreshToken');
  },
  removeLanguage() {
    Cookies.remove('lang');
  },
};

export default cookies;