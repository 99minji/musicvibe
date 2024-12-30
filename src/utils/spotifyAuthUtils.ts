import axios from "axios";
import { generateCodeChallenge, generateCodeVerifier } from "./pkceUtils";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || "";
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || "";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "streaming",
  "user-modify-playback-state",
  "user-read-playback-state",
];

// 1. Spotify 인증을 위한 리디렉션
export const redirectToSpotifyAuthorize = async () => {
  const codeVerifier = generateCodeVerifier(); // 랜덤한 문자열 생성
  const codeChallenge = await generateCodeChallenge(codeVerifier); // SHA-256 해시 및 Base64 URL-safe 인코딩

  localStorage.setItem("code_verifier", codeVerifier); // code_verifier 저장

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const params = {
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: SCOPES.join(" "),
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // 인증 페이지로 리디렉션
};

// 2. Authorization Code로 토큰 교환 -> 3. Callback.tsx
export const exchangeCodeForToken = async (
  authorizationCode: string
): Promise<void> => {
  const codeVerifier = localStorage.getItem("code_verifier"); // 로컬에 저장한 code_verifier 가져오기

  if (!codeVerifier) throw new Error("Code verifier not found");

  const tokenURL = "https://accounts.spotify.com/api/token";
  const params = {
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: "authorization_code",
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  };

  try {
    const response = await axios.post(tokenURL, new URLSearchParams(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // 토큰을 안전하게 저장 (예: 쿠키, 상태 관리 등)
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Expires In:", expires_in);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
  }
};
