export interface JwtHeader {
    alg: string;
    typ?: string;
  }
  
  export interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    role: string;
    iss: string;
    iat: number;
    exp: number;
  }
  
  export interface DecodedToken {
    header: JwtHeader;
    payload: JwtPayload;
  }
  
  export function decodeJwtToken(token: string): DecodedToken | null {
    if (!token || token.trim() === "") {
      return null;
    }
  
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("Token inválido");
    }
  
    try {
      const header = JSON.parse(window.atob(parts[0]));
      const payload = JSON.parse(window.atob(parts[1]));
      return { header, payload };
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      throw new Error("Token inválido");
    }
  }