// 랜덤한 문자열(code_verifier) 생성
const generateCodeVerifier = (): string => {
  const array = new Uint8Array(128);
  window.crypto.getRandomValues(array);
  return Array.from(array, (b) => ("0" + b.toString(16)).slice(-2)).join("");
};

// SHA-256으로 해시하고 Base64 URL로 인코딩
const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => String.fromCharCode(b))
    .join("")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export { generateCodeVerifier, generateCodeChallenge };
