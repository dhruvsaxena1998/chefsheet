import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

export interface ITextInputProps {
  classes?: {
    wrapper?: string;
    label?: string;
    labelText?: string;
    input?: string;
    error?: string;
  };
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  placeholder?: string;
  validate?: (value: string) => string | undefined;
}

export default function TextInput(props: ITextInputProps) {
  const {
    name,
    classes = {},
    label = "",
    type = "text",
    placeholder = "",
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
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={clsx(["input", "input-bordered", classes?.input])}
        validate={props.validate}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={clsx(["text-sm ml-2 mt-2 text-error"], classes?.error)}
      />
    </div>
  );
}
