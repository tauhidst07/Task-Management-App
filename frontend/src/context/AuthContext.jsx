import { createContext, useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";


const isTokenExpired = (token) => {
    if (!token) return true;
  
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const expiry = decodedPayload.exp;
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
     console.log("exp",expiry); 
     console.log("now",now);
      return now > expiry;  // Return true if token is expired
    } catch (error) {
      return true;  // If decoding fails, consider the token expired
    }
  };

export const AuthContext = createContext(); 



export const AuthProvider = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(localStorage.getItem("token")?true:false); 
    const [token,setToken] = useState(null);  
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
    
        // Check token expiration when app loads
        if (storedToken) {
          if (isTokenExpired(storedToken)) {
            logout();  // Token expired, log out the user
          } else {
            setToken(storedToken);
            setIsAuthenticated(true);
          }
        }
      }, []);

    const login = (userToken)=>{
       setToken(userToken); 
       localStorage.setItem("token",userToken); 
       setIsAuthenticated(true);
    } 

    const logout = ()=>{
        setToken(null); 
        localStorage.removeItem("token"); 
        setIsAuthenticated(false);   

    }  

     // Periodically check if the token is expired while using the app
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        logout();  // If the token is expired, log out the user
      }
    }, 60000);  // Check every 60 seconds

    return () => clearInterval(interval);  // Clear interval on component unmount
  }, [token]);

    return (
        <AuthContext.Provider  value={{isAuthenticated,login,logout,token}}>
            {children}
        </AuthContext.Provider>
    )
}