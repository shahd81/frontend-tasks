import { useState, useEffect,useContext } from "react";
import Button from "../components/common/Button/Button";
import TextInput from "../components/common/TextInput/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Roles } from "../constants/roles";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { login } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import { setAccessToken } from "../services/tokenStore";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { role, setRole } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("layout");
  const { handleLogin } = useContext(AuthContext);
const{accessToken}=useContext(AuthContext)
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const handleSubmit = async(e) => {
    e.preventDefault();
       if (accessToken) {
         setAccessToken(accessToken);
       }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.includes("@gmail.com")) {
      toast.error(t("login.emailError"));
      return;
    }
    // Validation password
    if (!password) {
      toast.error(t("login.passwordRequired"));
      return;
    }
    if (password.length < 8) {
      toast.error(t("login.passwordLength"));
      return;
    }
    setLoading(true);
   try {
      const res = await login(email, password);
      handleLogin(res);
      navigate("/Dashboard");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
    // setTimeout(() => {
    //   setLoading(false);
    //   toast.success(t("login.loginSuccess"));
    // }, 1000);
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center 
    justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className=" max-w-md flex flex-col gap-6 animate-fadeIn rounded-3xl p-12
         shadow-[0_0_80px_rgba(236,72,153,0.4)] bg-white dark:bg-gray-800 transition-colors"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-3">
          {t("login.welcomeBack")}
        </h2>
  
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          {t("login.loginInfo")}
        </p>

        <TextInput
          placeholder={t("login.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          placeholder={t("login.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role selection */}
        <div className="flex items-center gap-4 mt-2">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={Roles.User}>{t("login.user")}</option>
            <option value={Roles.Admin}>{t("login.admin")}</option>
          </select>
        </div>

        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={loading}
        >
          {loading ? t("login.loggingIn") : t("login.login")}
        </Button>

        <p className="text-gray-700 dark:text-gray-300 text-sm text-center mt-4">
          {t("login.dontHaveAccount")}{" "}
          <Link to="/Register" className="text-pink-400 hover:underline">
            {t("login.register")}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
