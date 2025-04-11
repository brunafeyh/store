export type JwtHeader = {
    alg: string;
    typ?: string;
}

export type JwtPayload = {
    sub: string;
    name: string;
    email: string;
    role: string;
    iss: string;
    iat: number;
    exp: number;
}

export type DecodedToken = {
    header: JwtHeader;
    payload: JwtPayload;
}