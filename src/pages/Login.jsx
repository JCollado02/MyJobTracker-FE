import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  // Setup login boxes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // displays errors
  const { login } = useAuth();
  const navigate = useNavigate();

  // redirect if already logged in (token still exists, finally works lol)
   useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth-check`, { withCredentials: true }) 
      .then(() => {
        login();
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {}); // If not logged in, do nothing, duh
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // clear old errors

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`, { email, password }, { withCredentials: true });
      login(); // Update auth state so we dont gotta login again
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    // Login Screen
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
