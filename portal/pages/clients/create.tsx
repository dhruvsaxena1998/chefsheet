import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { TextInput } from "shared/components";
import { ClientService } from "@shared/services";

import { IErrors } from "@types";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useTranslation } from "@shared/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CreateClient: NextPage = () => {
  const router = useRouter();
  const t = useTranslation();

  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t.client.form.name_error_required),
        contact_number: Yup.string()
          .matches(/^[0-9]{10}$/, t.client.form.contact_number_error_invalid)
          .required(t.client.form.contact_number_error_required),
        country_code: Yup.string()
          .oneOf(["+91", "+1"], t.client.form.country_code_onOf)
          .required(t.client.form.country_code_error_required),
        email: Yup.string()
          .email(t.client.form.email_error_invalid)
          .required(t.client.form.email_error_required),
        address: Yup.object().shape({
          plot_no: Yup.string().required(
            t.client.form.address.plot_no_error_required
          ),
          line_1: Yup.string().required(
            t.client.form.address.line_1_error_required
          ),
          line_2: Yup.string().required(
            t.client.form.address.line_2_error_required
          ),
          city: Yup.string().required(
            t.client.form.address.city_error_required
          ),
          state: Yup.string().required(
            t.client.form.address.state_error_required
          ),
          country: Yup.string().required(
            t.client.form.address.country_error_required
          ),
          postal_code: Yup.string()
            .matches(
              /^[0-9]{6}$/,
              t.client.form.address.postal_code_error_invalid
            )
            .required(t.client.form.address.postal_code_error_required),
        }),
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      await ClientService.create({
        ...values,
        contact_number: String(values.contact_number),
      });
      toast.success(t.client.messages.create_success);
      router.back();
    } catch (e) {
      const error = e as any;
      console.log(error);
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
          <title>{t.client.titles.create}</title>
        </Head>

        <div className="prose">
          <h1>{t.client.headings.create}</h1>
        </div>
        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: "",
              country_code: "+91",
              contact_number: "",
              email: "",
              address: {
                plot_no: "",
                line_1: "",
                line_2: "",
                state: "",
                city: "",
                postal_code: "",
                country: "India",
              },
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
                  label={t.staff_members.form.name}
                  name="name"
                  placeholder={t.staff_members.form.name_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

                <div className="flex gap-2">
                  <TextInput
                    label={t.staff_members.form.country_code}
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
                    label={t.staff_members.form.contact_number}
                    name="contact_number"
                    type="number"
                    placeholder={
                      t.staff_members.form.contact_number_placeholder
                    }
                    classes={{
                      wrapper: "flex-1",
                      input:
                        errors.contact_number && touched.contact_number
                          ? "border-red-500"
                          : "",
                    }}
                  />
                </div>

                <TextInput
                  label={t.client.form.email}
                  name="email"
                  placeholder={t.client.form.email_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input:
                      errors.email && touched.email ? "border-red-500" : "",
                  }}
                />

                <div className="my-4">
                  <h2 className="text-lg font-bold">
                    {t.staff_members.form.address.heading}
                  </h2>
                  <TextInput
                    label={t.staff_members.form.address.plot_no}
                    name="address.plot_no"
                    placeholder={
                      t.staff_members.form.address.plot_no_placeholder
                    }
                    classes={{
                      wrapper: "max-w-sm",
                      input:
                        errors.address?.plot_no && touched.address?.plot_no
                          ? "border-red-500"
                          : "",
                    }}
                  />

                  <TextInput
                    label={t.staff_members.form.address.line_1}
                    name="address.line_1"
                    placeholder={
                      t.staff_members.form.address.line_1_placeholder
                    }
                    classes={{
                      wrapper: "max-w-sm",
                      input:
                        errors.address?.line_1 && touched.address?.line_1
                          ? "border-red-500"
                          : "",
                    }}
                  />

                  <TextInput
                    label={t.staff_members.form.address.line_2}
                    name="address.line_2"
                    placeholder={
                      t.staff_members.form.address.line_2_placeholder
                    }
                    classes={{
                      wrapper: "max-w-sm",
                      input:
                        errors.address?.line_2 && touched.address?.line_2
                          ? "border-red-500"
                          : "",
                    }}
                  />

                  <div className="flex gap-2 mb-2">
                    <TextInput
                      label={t.staff_members.form.address.city}
                      name="address.city"
                      placeholder={
                        t.staff_members.form.address.city_placeholder
                      }
                      classes={{
                        wrapper: "flex-1",
                        input:
                          errors.address?.city && touched.address?.city
                            ? "border-red-500"
                            : "",
                      }}
                    />

                    <TextInput
                      label={t.staff_members.form.address.postal_code}
                      name="address.postal_code"
                      type="number"
                      placeholder={
                        t.staff_members.form.address.postal_code_placeholder
                      }
                      classes={{
                        wrapper: "max-w-sm",
                        input:
                          errors.address?.postal_code &&
                          touched.address?.postal_code
                            ? "border-red-500"
                            : "",
                      }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <TextInput
                      label={t.staff_members.form.address.state}
                      name="address.state"
                      placeholder={
                        t.staff_members.form.address.state_placeholder
                      }
                      classes={{
                        wrapper: "flex-1",
                        input:
                          errors.address?.state && touched.address?.state
                            ? "border-red-500"
                            : "",
                      }}
                    />

                    <TextInput
                      label={t.staff_members.form.address.country}
                      name="address.country"
                      placeholder={
                        t.staff_members.form.address.country_placeholder
                      }
                      classes={{
                        wrapper: "flex-1",
                        input:
                          errors.address?.country && touched.address?.country
                            ? "border-red-500"
                            : "",
                      }}
                    />
                  </div>
                </div>

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

export default CreateClient;
