import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from '../assets/images/login-bg.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <>

      <div className="flex min-h-screen">
        {/* Left side with image */}
        <div
          className="w-1/2 hidden lg:block bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,

          }}
        ></div>

        {/* Right side login form */}
        <div className="relative w-full lg:w-1/2 bg-black text-white flex flex-col justify-center items-center px-8 py-12">
          {/* Home Button */}
          <button
            className="absolute top-4 left-4 text-red-600 font-bold text-lg  hover:text-red-800  transition"
            onClick={() => navigate("/")}
          >
            Home
          </button>


          <div className="max-w-sm w-full">
            <h2 className="text-4xl font-semibold text-center mb-2">
              Casino TreeS
            </h2>
            <p className="text-center text-lg mb-6">Nice to see you again</p>

            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Email or phone number"
                  className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full p-3 pr-10 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>

              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-3 rounded-md hover:opacity-90 transition"
              >
                Sign in
              </button>
            </form>

            <div className="my-4 text-center text-sm text-gray-400">or</div>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{' '}
              <a href="#" className="text-blue-400 hover:underline">
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
