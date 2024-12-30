import { exchangeCodeForToken } from "../utils/spotifyAuthUtils";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 3. 리디렉션 후 Authorization Code 처리
const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
      exchangeCodeForToken(authorizationCode).then(() => {
        navigate("/");
      });
    } else {
      console.error("Authorization code not found");
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
};

export default Callback;
