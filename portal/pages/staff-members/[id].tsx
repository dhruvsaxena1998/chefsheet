import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { StaffMemberService, UserService } from "@shared/services";

import { IErrors, IStaffMember, IUser } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { useTranslation } from "@shared/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);

  try {
    const { data } = await StaffMemberService.findOne(id, {
      populate: ["address"],
    });

    const { data: staffMember } = data;
    return {
      props: {
        id,
        staffMember,
      },
    };
  } catch (e) {
    return { props: { id, staffMember: null } };
  }
};

const EditStaffMember: NextPage<{
  id: number;
  staffMember?: IStaffMember;
}> = (props) => {
  const router = useRouter();
  const t = useTranslation();

  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t.staff_members.form.name_error_required),
        contact_number: Yup.string()
          .matches(
            /^[0-9]{10}$/,
            t.staff_members.form.contact_number_error_invalid
          )
          .required(t.staff_members.form.contact_number_error_required),
        country_code: Yup.string()
          .oneOf(["+91", "+1"], t.staff_members.form.country_code_onOf)
          .required(t.staff_members.form.country_code_error_required),
        gender: Yup.string()
          .oneOf(
            ["male", "female", "other", "prefer_not_to_say"],
            t.staff_members.form.gender_error_onOf
          )
          .required(t.staff_members.form.gender_error_required),
        role: Yup.string()
          .oneOf(
            ["manager", "employee", "contract"],
            t.staff_members.form.role_error_onOf
          )
          .required(t.staff_members.form.role_error_required),
        address: Yup.object().shape({
          plot_no: Yup.string().required(
            t.staff_members.form.address.plot_no_error_required
          ),
          line_1: Yup.string().required(
            t.staff_members.form.address.line_1_error_required
          ),
          line_2: Yup.string().required(
            t.staff_members.form.address.line_2_error_required
          ),
          city: Yup.string().required(
            t.staff_members.form.address.city_error_required
          ),
          state: Yup.string().required(
            t.staff_members.form.address.state_error_required
          ),
          country: Yup.string().required(
            t.staff_members.form.address.country_error_required
          ),
          postal_code: Yup.string()
            .matches(
              /^[0-9]{6}$/,
              t.staff_members.form.address.postal_code_error_invalid
            )
            .required(t.staff_members.form.address.postal_code_error_required),
        }),
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      await StaffMemberService.update(props.id, {
        ...values,
        contact_number: String(values.contact_number),
      });
      toast.success(t.staff_members.messages.create_success);
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

  if (!props.staffMember) {
    return (
      <DefaultLayout>
        <Error404
          title={t.staff_members.headings.index}
          message={t.staff_members.messages.error_404}
        />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.staff_members.titles.edit}</title>
        </Head>

        <div className="prose">
          <h1>{t.staff_members.headings.edit}</h1>
        </div>
        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: props.staffMember.name || "",
              country_code: props.staffMember.country_code || "+91",
              contact_number: props.staffMember.contact_number || "",
              gender: props.staffMember.gender || "null",
              role: props.staffMember.role || "employee",
              address: {
                plot_no: props.staffMember.address?.plot_no || "",
                line_1: props.staffMember.address?.line_1 || "",
                line_2: props.staffMember.address?.line_2 || "",
                state: props.staffMember.address?.state || "",
                city: props.staffMember.address?.city || "",
                postal_code: props.staffMember.address?.postal_code || "",
                country: props.staffMember.address?.country || "India",
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
                  label={t.staff_members.form.gender}
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
                      {t.staff_members.form.gender_option_select}
                    </option>
                    <option value="male">
                      {t.staff_members.form.gender_option_male}
                    </option>
                    <option value="female">
                      {t.staff_members.form.gender_option_female}
                    </option>
                    <option value="other">
                      {t.staff_members.form.gender_option_other}
                    </option>
                    <option value="prefer_not_to_say">
                      {t.staff_members.form.gender_option_prefer_not_to_say}
                    </option>
                  </>
                </TextInput>

                <TextInput
                  label={t.staff_members.form.role}
                  name="role"
                  type="select"
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.role && touched.role ? "border-red-500" : "",
                  }}
                >
                  <>
                    <option value="manager">
                      {t.staff_members.form.role_option_manager}
                    </option>
                    <option value="employee">
                      {t.staff_members.form.role_option_employee}
                    </option>
                    <option value="contract">
                      {t.staff_members.form.role_option_contract}
                    </option>
                  </>
                </TextInput>

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

export default EditStaffMember;
