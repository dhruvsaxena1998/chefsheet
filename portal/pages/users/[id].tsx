import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { SubCategoryService, UserService } from "@shared/services";

import { ISubCategory, IUser } from "@types";
import type { GetServerSideProps, NextPage } from "next";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid contact number")
    .required("Contact number is required"),
});

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
          title="Users"
          message={`User with ID-${props.id} not found! :(`}
        />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>User - Edit</title>
        </Head>

        <div className="prose">
          <h1>Edit User</h1>
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
                  label="Name"
                  name="name"
                  placeholder="e.g. Reusable"
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label="Email"
                  name="email"
                  disabled={true}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label="Contact Number"
                  name="contact_number"
                  type="number"
                  placeholder="e.g. Reusable"
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
                  Update
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
