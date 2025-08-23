import "server-only";

/*
Importamos crypto.scrypt (un algoritmo de derivación de claves incluido en Node.js, seguro y moderno).
Antes dependías de bcryptjs (un paquete externo).
Ahora usas una librería nativa, mantenida directamente por Node.
Definimos parámetros de seguridad (N=16384, r=8, p=1):
Controlan lo difícil que es calcular el hash.
Son estándar: suficientemente lentos para frenar ataques, pero rápidos para tus usuarios.
Generamos un salt aleatorio (16 bytes) para cada contraseña.
El salt evita que dos contraseñas iguales generen el mismo hash.
Así, aunque alguien robe tu DB, no puede usar tablas precalculadas.
Guardamos la contraseña en formato “autodocumentado”:
scrypt$N=16384,r=8,p=1$<salt_b64>$<hash_b64>
*/

import {
  randomBytes,
  scrypt as _scrypt,
  timingSafeEqual,
  type ScryptOptions,
} from "crypto";
import { promisify } from "util";

// ---- Parámetros recomendados de scrypt ----
const N = 16384;  // cost factor
const r = 8;      // block size
const p = 1;      // parallelization
const KEY_LEN = 64;   // longitud del hash (bytes)
const SALT_LEN = 16;  // longitud del salt (bytes)

// Arreglamos la firma de tipos para aceptar "options" como 4º argumento
const scrypt = promisify(_scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options?: ScryptOptions
) => Promise<Buffer>;

// Formato de almacenamiento: "scrypt$N=...,r=...,p=...$<salt_b64>$<hash_b64>"
export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(SALT_LEN);
  const derivedKey = await scrypt(plain, salt, KEY_LEN, { N, r, p });
  return `scrypt$N=${N},r=${r},p=${p}$${salt.toString("base64")}$${derivedKey.toString("base64")}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  if (!stored?.startsWith("scrypt$")) return false;

  const parts = stored.split("$"); // ["scrypt", "N=...,r=...,p=1", "<salt_b64>", "<hash_b64>"]
  if (parts.length !== 4) return false;

  const params = parts[1];
  const saltB64 = parts[2];
  const hashB64 = parts[3];

  const getParam = (name: string, def: number) =>
    Number(
      params
        .split(",")
        .map((kv) => kv.split("="))
        .find(([k]) => k === name)?.[1] ?? def
    );

  const n = getParam("N", N);
  const rr = getParam("r", r);
  const pp = getParam("p", p);

  const salt = Buffer.from(saltB64, "base64");
  const expected = Buffer.from(hashB64, "base64");

  // Derivamos con los mismos parámetros y longitud del hash esperado
  const derived = await scrypt(plain, salt, expected.length, { N: n, r: rr, p: pp });

  // Comparación en tiempo constante
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

