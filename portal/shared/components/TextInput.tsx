import clsx from "clsx";
import { ErrorMessage, Field } from "formik";
import { PropsWithChildren } from "react";

export interface ITextInputProps {
  classes?: {
    wrapper?: string;
    label?: string;
    labelText?: string;
    input?: string;
    error?: string;
    hint?: string;
  };
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "select";
  hint?: string;
  placeholder?: string;
  autocomplete?: "on" | "off";

  validate?: (value: string) => string | undefined;
}

export const TextInput = (props: PropsWithChildren<ITextInputProps>) => {
  const {
    name,
    classes = {},
    label = "",
    type = "text",
    placeholder = "",
    children,
    hint,
    autocomplete = "off",
  } = props;

  return (
    <div className={clsx(["form-control", classes?.wrapper])}>
      {label && (
        <label className={clsx(["label", classes?.label])} htmlFor={name}>
          <span className={clsx(["label-text", classes?.labelText])}>
            {label}
          </span>
        </label>
      )}
      {type === "select" ? (
        <Field
          id={name}
          name={name}
          as="select"
          className={clsx(["input input-bordered", classes?.input])}
          validate={props.validate}
        >
          {children}
        </Field>
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={clsx(["input", "input-bordered", classes?.input])}
          validate={props.validate}
          autoComplete={autocomplete}
        />
      )}
      {hint && (
        <span
          className={clsx(["mt-1 ml-2 text-slate-300 text-sm", classes?.hint])}
        >
          {hint}
        </span>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className={clsx(["text-sm ml-2 mt-2 text-error"], classes?.error)}
      />
    </div>
  );
};

export default TextInput;
