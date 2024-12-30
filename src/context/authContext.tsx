import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface authContextProps {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  userData: any;
  setUserData: (data: any) => void;
}

const AuthContext = createContext<authContextProps | undefined>(undefined);

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (accessToken) {
      // 액세스 토큰이 있으면 사용자 데이터 가져오기
      fetchUserData(accessToken).then((data) => setUserData(data));
    }
  }, [accessToken]);

  const fetchUserData = async (token: string) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use Spotify context
export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
