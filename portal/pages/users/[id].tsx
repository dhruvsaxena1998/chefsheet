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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);

  try {
    const { data } = await UserService.findOne(id, {
      populate: ["profile_image", "clients", "inventories", "staff_members"],
    });

    const { data: user } = data;
    return {
      props: {
        id,
        user,
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
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      await UserService.update(props.user!.id!, {
        ...values,
        contact_number: String(values.contact_number),
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!props.user) {
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
              name: props?.user?.name || "",
              email: props.user.email || "",
              contact_number: props.user.contact_number || "",
            }}
            onSubmit={handleOnSubmit}
            validationSchema={ValidationSchema}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={true}
          >
            {({ isSubmitting, isValidating, isValid, errors, touched }) => (
              <Form>
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
                  disabled={true}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label={t.users.form.contact_number}
                  name="contact_number"
                  type="number"
                  placeholder={t.users.form.contact_number_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

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
