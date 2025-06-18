import {
    createRemoteJWKSet,
    JWTPayload,
    jwtVerify,
    JWTVerifyOptions,
} from "jose";

const JWKS = createRemoteJWKSet(
    new URL(
        `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    )
);
const JWT_OPTS: JWTVerifyOptions = {
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    audience: process.env.AUTH0_AUDIENCE,
    algorithms: ["RS256"],
    maxTokenAge: "100d", // 100 days
};

export const jwtChecker =
    <T extends JWTPayload>(jwt: string | Uint8Array) =>
    () =>
        jwtVerify<T>(jwt, JWKS, JWT_OPTS);
