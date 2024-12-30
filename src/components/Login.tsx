import { redirectToSpotifyAuthorize } from "../utils/spotifyAuthUtils";

/* Authorization Code Flow with PKCE를 구현
사용자를 Spotify의 인증 페이지로 리디렉션하고, 액세스 토큰 및 리프레시 토큰을 관리하여 사용자 데이터를 가져옵니다. */

const Login = () => {
  const handleLogin = async () => {
    await redirectToSpotifyAuthorize(); // Spotify 인증 URL로 리디렉션
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인하기</button>
    </div>
  );
};

export default Login;
