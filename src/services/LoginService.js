import { dateAdd } from "./utils";
import { CacheManager } from "./cache";
import config from "../config";

export class LoginService {
  defaultState = {
    redirectPath: "/",
    expires: dateAdd(new Date(), "minute", 5).toISOString(),
  };

  getAuthenticationState = () => {
    const cacheMngr = new CacheManager();
    const accessToken = cacheMngr.get(config.Login.cacheKey);
    const isAuthenticated = accessToken && accessToken.data;
    return isAuthenticated;
  };

  logout() {
    new CacheManager().clear();
    return (window.location.href = "http://localhost:3000/");
  }
}
