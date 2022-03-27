import { useMemo } from "react";
import { TextInput } from "@shared/components";
import { useTranslation } from "@shared/hooks";
import clsx from "clsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { client } from "@utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const t = useTranslation();

  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        identifier: Yup.string()
          .email(t.login.form.email_error_invalid)
          .required(t.login.form.email_error_required),
        password: Yup.string()
          .min(6, t.login.form.password_error_min)
          .required(t.login.form.password_error_required),
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      const { data } = await client.post("/auth/local", {
        identifier: values.identifier,
        password: values.password,
      });

      localStorage.setItem("token", data.jwt);
      router.replace("/home");
    } catch (e) {
      console.log(e)
      toast.error(t.login.messages.invalid);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <main className="my-4 p-4 w-1/3">
        <div className="my-4 flex flex-col gap-2">
          <h1 className="text-5xl font-bold">{t.login.heading}</h1>
          <h2 className="text-2xl font-light">{t.login.name}</h2>
        </div>

        <Formik
          initialValues={{
            identifier: "",
            password: "",
          }}
          onSubmit={handleOnSubmit}
          validationSchema={ValidationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          validateOnMount={true}
        >
          {({ isSubmitting, isValidating, isValid, errors, touched }) => (
            <Form className="w-lg">
              <TextInput
                label={t.login.form.email}
                name="identifier"
                placeholder={t.login.form.email_placeholder}
                classes={{
                  wrapper: "max-w-lg w-full",
                  input:
                    errors.identifier && touched.identifier
                      ? "border-red-500"
                      : "",
                }}
              />

              <TextInput
                label={t.login.form.password}
                name="password"
                type="password"
                placeholder={t.login.form.password_placeholder}
                classes={{
                  wrapper: "max-w-lg w-full",
                  input:
                    errors.password && touched.password ? "border-red-500" : "",
                }}
              />

              <button
                type="submit"
                className={clsx([
                  "my-4 btn w-full max-w-lg",
                  { "bg-primary": isValid },
                  { loading: isValidating || isSubmitting },
                  { disabled: !isValid || isValidating || isSubmitting },
                ])}
              >
                {t.buttons.login}
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Login;
