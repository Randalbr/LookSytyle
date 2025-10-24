import { jwtDecode  } from "jwt-decode";

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode (token);
    if (!decoded.exp) return false;

    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function getUserFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode (token);
  } catch {
    return null;
  }
}
