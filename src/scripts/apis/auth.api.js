export class AuthApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async register(user) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json()

    } catch (error) {
      console.log(error);
    }
  }

  async login(credentials) {
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json()

    } catch (error) {
      console.log(error);
    }
  }
  
  async update(id, data) {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update post with ID ${id}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error during post update:", error);
    }
  }
}
