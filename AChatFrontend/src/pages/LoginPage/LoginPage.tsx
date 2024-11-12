import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import s from "./LoginPage.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setError(() => {
        return "";
      });

      setEmail(() => {
        return "";
      });
      setPassword(() => {
        return "";
      });
    };
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginCoroutine = async () => {
      try {
        if (email.length > 0 && password.length > 0) {
          const token = await login(email, password);
          localStorage.setItem("accessToken", token);
          navigate("/search_rooms");
        } else {
          setError("Please type email and password");
        }
      } catch (e) {
        setError("Bad email or password");
      }
    };
    loginCoroutine();
  };

  return (
    <div className={s.login_page_container}>
      <form className={s.page_form_container} onSubmit={onSubmit}>
        <h4 className={s.subtitle}>AChat</h4>
        <h4 className={s.subtitle}>Sign In</h4>
        <div className={s.page_form_input_container}>
          <p className={s.error_default_text}>{error}</p>
          <div className={s.page_form_input_with_error_container}>
            <Input
              id="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={s.page_form_input_with_error_container}>
            <Input
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button text="Submit" type="submit" style={{ width: "100%" }} />
        <a href="/register">
          <p className={s.default_text}>Have no account?</p>
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
