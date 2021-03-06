import clsx from "clsx";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { ChangeEvent, PropsWithChildren } from "react";

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
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "select"
    | "date"
    | "textarea";
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: "on" | "off";

  validate?: (value: string) => string | undefined;
  onChange?: (value: any, event: ChangeEvent<any>) => void;
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
    disabled = false,
  } = props;

  const { handleChange } = useFormikContext();

  return (
    <div className={clsx(["form-control", classes?.wrapper])}>
      {/* Render label for text input if provided from props */}
      {label && (
        <label className={clsx(["label", classes?.label])} htmlFor={name}>
          <span className={clsx(["label-text", classes?.labelText])}>
            {label}
          </span>
        </label>
      )}
      {/* 
        Same Field is rendred for every type of input,
        Exception - Textarea and Select box
      */}

      {/* If type is slect render this Field */}
      {type === "select" ? (
        <Field
          id={name}
          name={name}
          as="select"
          className={clsx(["input input-bordered", classes?.input])}
          validate={props.validate}
          disabled={disabled}
          onChange={(e: ChangeEvent<any>) => {
            handleChange(e);
            props.onChange && props.onChange(e.target.value, e);
          }}
        >
          {children}
        </Field>
      ) : type === "textarea" ? (
        // Render textarea if type is textarea
        <Field
          id={name}
          name={name}
          as="textarea"
          placeholder={placeholder}
          className={clsx(["textarea textarea-bordered", classes?.input])}
          validate={props.validate}
          autoComplete={autocomplete}
          disabled={disabled}
        />
      ) : (
        // Render this Field if type is not select or textarea
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={clsx(["input input-bordered", classes?.input])}
          validate={props.validate}
          autoComplete={autocomplete}
          disabled={disabled}
        />
      )}
      {/* Render a hint label if hint is provided in property */}
      {hint && (
        <span
          className={clsx(["mt-1 ml-2 text-slate-300 text-sm", classes?.hint])}
        >
          {hint}
        </span>
      )}
      {/*Show Error Message if error validation occoures*/}
      <ErrorMessage
        name={name}
        component="div"
        className={clsx(["text-sm ml-2 mt-2 text-error"], classes?.error)}
      />
    </div>
  );
};
