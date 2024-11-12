import { FormEvent, useState } from "react";
import s from "./RegisterPage.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { login, register } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameRegex = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const passwordRegex = /^[A-Za-z0-9_]\w{8,}$/;

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const registerCoroutine = async () => {
    const token = await register(username, email, password);
    localStorage.setItem("accessToken", token);
    navigate("/search_rooms");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsernameError(() => {
      return "";
    });
    setEmailError(() => {
      return "";
    });
    setPasswordError(() => {
      return "";
    });

    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Name must start with a latin letter. It can contain only latin letters, numbers, underscores, hyphens and spaces"
      );
    }

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must have more than 8 characters and consist of latin letters, numbers and underscores"
      );
    }

    if (
      passwordError.length == 0 &&
      emailError.length == 0 &&
      usernameError.length == 0
    ) {
      registerCoroutine();
    }

    return () => {
      setUsername(() => {
        return "";
      });
      setEmail(() => {
        return "";
      });
      setPassword(() => {
        return "";
      });

      setUsernameError(() => {
        return "";
      });
      setEmailError(() => {
        return "";
      });
      setPasswordError(() => {
        return "";
      });
    };
  };

  return (
    <div className={s.register_page_container}>
      <form className={s.page_form_container} onSubmit={onSubmit}>
        <h4 className={s.subtitle}>AChat</h4>
        <h4 className={s.subtitle}>Sign Up</h4>
        <div className={s.page_form_input_container}>
          <div className={s.page_form_input_with_error_container}>
            <Input
              id="username"
              label="Username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
            />
            <p className={s.error_default_text}>{usernameError}</p>
          </div>
          <div className={s.page_form_input_with_error_container}>
            <Input
              id="email"
              label="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            <p className={s.error_default_text}>{emailError}</p>
          </div>
          <div className={s.page_form_input_with_error_container}>
            <Input
              id="password"
              label="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <p className={s.error_default_text}>{passwordError}</p>
          </div>
        </div>
        <Button text="Submit" type="submit" style={{ width: "100%" }} />
        <a href="/login">
          <p className={s.default_text}>Already have account?</p>
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
