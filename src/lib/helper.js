"use server";
import * as JOSE from "jose";
import { cookies } from "next/headers";

export async function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }
  const enc = new TextEncoder().encode(secret);
  return enc;
}

export const getDataFromToken = async (request) => {
  try {
    const token = cookies().get(process.env.COOKIE_NAME)?.value || "";
    // request.cookies.get(process.env.COOKIE_NAME)?.value || "";
    if (!token) {
      return null;
    }
    const { payload } = await JOSE.jwtVerify(token, await getJwtSecretKey());
    return payload.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getJWTToken = async ({ tokenData, expirationTime = "1d" }) => {
  const token = await new JOSE.SignJWT(tokenData)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(await getJwtSecretKey());
  return token;
};
