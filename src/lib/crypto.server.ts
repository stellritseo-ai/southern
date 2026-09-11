async function getCryptoModule() {
  const loadModule = new Function("m", "return import(m)");
  return loadModule("crypto");
}

export async function hashPassword(password: string): Promise<string> {
  const { pbkdf2Sync, randomBytes } = await getCryptoModule();
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash) return false;
  if (!storedHash.includes(":")) {
    return password === storedHash;
  }
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) {
    return false;
  }
  const { pbkdf2Sync } = await getCryptoModule();
  const verifyHash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === verifyHash;
}
