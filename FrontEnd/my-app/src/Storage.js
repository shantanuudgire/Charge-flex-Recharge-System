class StorageService {
    static TOKEN = "token";
    static USER = "user";
  
    static saveToken(token) {
      localStorage.removeItem(this.TOKEN);
      localStorage.setItem(this.TOKEN, token);
    }
  
    static saveUser(user) {
      localStorage.removeItem(this.USER);
      localStorage.setItem(this.USER, JSON.stringify(user));
    }
  
    static getToken() {
      return localStorage.getItem(this.TOKEN);
    }
  
    static getUser() {
      const userJson = localStorage.getItem(this.USER);
      return userJson ? JSON.parse(userJson) : null;
    }
  
    static getUserRole() {
      const user = this.getUser();
      return user ? user.role : "";
    }
  
    static getUserId() {
      const user = this.getUser();
      return user ? user.id : "";
    }
  
    static getUserName() {
      const user = this.getUser();
      return user ? user.name : "";
    }
  
    static getUserPhone() {
      const user = this.getUser();
      return user ? user.phone : "";
    }
  
    static getUserEmail() {
      const user = this.getUser();
      return user ? user.email : "";
    }
  
    static isAdminLoggedIn() {
      if (!this.getToken()) return false;
      return this.getUserRole() === "ADMIN";
    }
  
    static isCustomerLoggedIn() {
      if (!this.getToken()) return false;
      return this.getUserRole() === "CUSTOMER";
    }
  
    static logout() {
      localStorage.removeItem(this.TOKEN);
      localStorage.removeItem(this.USER);
    }
  }
  
  export default StorageService;