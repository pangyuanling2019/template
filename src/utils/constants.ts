export const isDev = process.env.NODE_ENV === "development";
export const LoginStorageKey = "loginInfo";
export const TokenStorageKey = "_token";

/**记录token信息 */
export function getTokenInfo() {
  return JSON.parse(localStorage.getItem(TokenStorageKey) || "{}") || null;
}
export function setTokenInfo(value: any) {
  localStorage.setItem(TokenStorageKey, JSON.stringify(value));
  return true;
}
export function removeTokenInfo() {
  return localStorage.removeItem(TokenStorageKey);
}
