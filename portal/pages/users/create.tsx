import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { UserService } from "@shared/services";

import { IErrors, IUser } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { useTranslation } from "@shared/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CreateUser: NextPage = () => {
  const router = useRouter();
  const t = useTranslation();

  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t.users.form.name_error_required),
        email: Yup.string()
          .email(t.users.form.email_error_invalid)
          .required(t.users.form.email_error_required),
        contact_number: Yup.string()
          .matches(/^[0-9]{10}$/, t.users.form.contact_number_error_invalid)
          .required(t.users.form.contact_number_error_required),
        country_code: Yup.string()
          .oneOf(["+91", "+1"], t.users.form.country_code_onOf)
          .required(t.users.form.country_code_error_required),
        gender: Yup.string()
          .oneOf(
            ["male", "female", "other", "prefer_not_to_say"],
            t.users.form.gender_error_onOf
          )
          .required(t.users.form.gender_error_required),
        role: Yup.string()
          .oneOf(["admin", "editor", "viewer"], t.users.form.role_error_onOf)
          .required(t.users.form.role_error_required),
        password: Yup.string()
          .min(6, t.users.form.password_error_min)
          .required(t.users.form.password_error_required),
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      await UserService.create({
        ...values,
        username: values.email,
        contact_number: String(values.contact_number),
      });
      toast.success(t.users.messages.create_success);
      router.back();
    } catch (e) {
      const error = e as any;
      console.log(error)
      const { data, status } = error?.response || {};
      if (status === 400) {
        const { message } = data?.error as IErrors;
        toast.error(message);
      }
    }
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.users.titles.create}</title>
        </Head>

        <div className="prose">
          <h1>{t.users.headings.create}</h1>
        </div>
        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              country_code: "+91",
              contact_number: "",
              gender: "null",
              role: "editor",
            }}
            onSubmit={handleOnSubmit}
            validationSchema={ValidationSchema}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={true}
          >
            {({ isSubmitting, isValidating, isValid, errors, touched }) => (
              <Form className="max-w-sm">
                <TextInput
                  label={t.users.form.name}
                  name="name"
                  placeholder={t.users.form.name_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label={t.users.form.email}
                  name="email"
                  placeholder={t.users.form.email_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input:
                      errors.email && touched.email ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label={t.users.form.password}
                  name="password"
                  type="password"
                  placeholder={t.users.form.password_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input:
                      errors.password && touched.password
                        ? "border-red-500"
                        : "",
                  }}
                />

                <div className="flex gap-2">
                  <TextInput
                    label={t.users.form.country_code}
                    name="country_code"
                    type="select"
                    classes={{
                      wrapper: "max-w-sm",
                      input:
                        errors.country_code && touched.country_code
                          ? "border-red-500"
                          : "",
                    }}
                  >
                    <>
                      <option value="+1">+1</option>
                      <option value="+91">+91</option>
                    </>
                  </TextInput>

                  <TextInput
                    label={t.users.form.contact_number}
                    name="contact_number"
                    type="number"
                    placeholder={t.users.form.contact_number_placeholder}
                    classes={{
                      wrapper: "max-w-xs flex-1",
                      input:
                        errors.contact_number && touched.contact_number
                          ? "border-red-500"
                          : "",
                    }}
                  />
                </div>

                <TextInput
                  label={t.users.form.gender}
                  name="gender"
                  type="select"
                  classes={{
                    wrapper: "max-w-sm",
                    input:
                      errors.gender && touched.gender ? "border-red-500" : "",
                  }}
                >
                  <>
                    <option value="null" disabled>
                      {t.users.form.gender_option_select}
                    </option>
                    <option value="male">
                      {t.users.form.gender_option_male}
                    </option>
                    <option value="female">
                      {t.users.form.gender_option_female}
                    </option>
                    <option value="other">
                      {t.users.form.gender_option_other}
                    </option>
                    <option value="prefer_not_to_say">
                      {t.users.form.gender_option_prefer_not_to_say}
                    </option>
                  </>
                </TextInput>

                <TextInput
                  label={t.users.form.role}
                  name="role"
                  type="select"
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.role && touched.role ? "border-red-500" : "",
                  }}
                >
                  <>
                    <option value="admin">
                      {t.users.form.role_option_admin}
                    </option>
                    <option value="editor">
                      {t.users.form.role_option_editor}
                    </option>
                    <option value="viewer">
                      {t.users.form.role_option_viewer}
                    </option>
                  </>
                </TextInput>

                <button
                  type="submit"
                  className={clsx([
                    "my-4 btn w-full max-w-sm",
                    { "bg-primary": isValid },
                    { loading: isValidating || isSubmitting },
                    { disabled: !isValid || isValidating || isSubmitting },
                  ])}
                >
                  {t.buttons.create}
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </>
    </DefaultLayout>
  );
};

export default CreateUser;
