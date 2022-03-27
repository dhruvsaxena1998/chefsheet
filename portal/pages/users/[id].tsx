import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { UserService } from "@shared/services";

import { IUser } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { useTranslation } from "@shared/hooks";
import { toast } from "react-toastify";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);

  try {
    const { data } = await UserService.findOne(id, {
      populate: [
        "profile_image",
        "clients",
        "inventories",
        "staff_members",
        "role",
      ],
    });
    return {
      props: {
        id,
        user: data,
      },
    };
  } catch (e) {
    return { props: { id, user: null } };
  }
};

const EditUser: NextPage<{
  id: number;
  user?: IUser;
}> = (props) => {
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
        // role: Yup.string()
        //   .oneOf(["admin", "editor", "viewer"], t.users.form.role_error_onOf)
        //   .required(t.users.form.role_error_required),
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      await UserService.update(props.user!.id!, {
        ...values,
        contact_number: String(values.contact_number),
      });
      toast.success(t.users.messages.update_success);
    } catch (e) {
      console.error(e);
    }
  };

  const { user } = props;

  if (!user) {
    return (
      <DefaultLayout>
        <Error404
          title={t.users.headings.index}
          message={t.users.messages.error_404}
        />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.users.titles.edit}</title>
        </Head>

        <div className="prose">
          <h1>{t.users.headings.edit}</h1>
        </div>
        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: user.name || "",
              email: user.email || "",
              country_code: user.country_code || "+91",
              contact_number: user.contact_number || "",
              gender: user.gender || "null",
              // role: user.role || "editor",
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
                  disabled
                  classes={{
                    wrapper: "max-w-sm",
                    input:
                      errors.email && touched.email ? "border-red-500" : "",
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

                {/* <TextInput
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
                </TextInput> */}

                <button
                  type="submit"
                  className={clsx([
                    "my-4 btn w-full max-w-sm",
                    { "bg-primary": isValid },
                    { loading: isValidating || isSubmitting },
                    { disabled: !isValid || isValidating || isSubmitting },
                  ])}
                >
                  {t.buttons.update}
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </>
    </DefaultLayout>
  );
};

export default EditUser;
