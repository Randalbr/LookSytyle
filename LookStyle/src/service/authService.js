import API_URL from '../utils/api'

export async function loginUser(data) {
  try {
    const res = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Error en login:", error);
    return { error: "No se pudo conectar con el servidor" };
  }
}