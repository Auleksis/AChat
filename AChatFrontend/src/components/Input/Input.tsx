import { forwardRef } from "react";
import s from "./Input.module.css";

export interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, children, ...props }, forwardRef) => (
    <div className={s.input_container}>
      {label.length > 0 && (
        <label className={s.default_text} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={forwardRef}
        id={id}
        type="text"
        className={s.input}
        {...props}
      />
      {children}
    </div>
  )
);

export default Input;
