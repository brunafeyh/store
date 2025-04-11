import { DecodedToken } from "../types/jwt-token"

export function decodeJwtToken(token: string): DecodedToken | null {
  const cleanedToken = token.trim().replace(/^"(.*)"$/, '$1')

  if (!cleanedToken || cleanedToken === "") return null

  const parts = cleanedToken.split('.')

  if (parts.length !== 3) throw new Error("Token inválido")

  try {
    const header = JSON.parse(window.atob(parts[0]))
    const payload = JSON.parse(window.atob(parts[1]))
    return { header, payload };
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    throw new Error("Token inválido");
  }
}
