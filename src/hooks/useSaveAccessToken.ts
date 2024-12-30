import { useCookies } from "react-cookie";

// 사용자가 인증 후 access_token을 받아서 쿠키에 저장
const useSaveAccessToken = () => {
  const [, setCookie] = useCookies(["accessToken"]);

  const saveAccessToken = (hash: string): string | null => {
    const params = new URLSearchParams(hash.substring(1)); // URL 해시를 파싱하여 파라미터 가져오기
    const accessToken = params.get("access_token"); // 액세스 토큰
    const expiresIn = params.get("expires_in"); // 만료 시간

    if (accessToken && expiresIn) {
      setCookie("accessToken", accessToken, {
        path: "/",
        maxAge: parseInt(expiresIn, 10),
      });
      return accessToken;
    }

    return null;
  };

  return saveAccessToken;
};

export default useSaveAccessToken;
