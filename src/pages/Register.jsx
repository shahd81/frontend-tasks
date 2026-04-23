import { useState } from "react";
import Button from "../components/common/Button/Button";
import TextInput from "../components/common/TextInput/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation("layout");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Name validation
    if (!name.trim()) {
      toast.error(t("register.nameRequired"));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.includes("@gmail.com")) {
      toast.error(t("register.emailError"));
      return;
    }

    // Password validation
    if (!password) {
      toast.error(t("register.passwordRequired"));
      return;
    }
    if (password.length < 8) {
      toast.error(t("register.passwordLength"));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(t("register.registerSuccess"));
      navigate("/Home");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6 rounded-3xl p-12 
                    bg-white dark:bg-gray-800
                 shadow-[0_0_80px_rgba(236,72,153,0.4)] 
                transition-colors"
      >
        <h2 className="text-4xl font-bold text-center text-black dark:text-white">
          {t("register.title")}
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300">
          {t("register.subtitle")}
        </p>

        <TextInput
          placeholder={t("register.name")}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInput
          placeholder={t("register.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          placeholder={t("register.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? t("register.registering") : t("register.register")}
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          {t("register.alreadyHaveAccount")}{" "}
          <Link to="/" className="text-pink-400 hover:underline">
            {t("register.login")}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
