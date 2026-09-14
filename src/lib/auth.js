import api from "./api";

const TOKEN_KEY = "esc_admin_token";
const USER_KEY = "esc_admin_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return !!getToken();
}

function setSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login(email, password) {
  const { data } = await api.post("/login", { email, password });
  return data;
}

export async function verifyOtpCode(email, code) {
  const { data } = await api.post("/login/verify-code", { email, code });
  setSession(data.token, data.user);
  return data.user;
}

export async function logout() {
  try {
    await api.post("/logout");
  } catch {
    // Best-effort : on nettoie quand même le token localement si l'appel échoue.
  }
  clearToken();
}
