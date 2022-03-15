import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";
import { TextInput } from "@shared/components";
import { CategoryService, CreateCategoryDTO } from "@shared/services";

import type { GetServerSideProps, NextPage } from "next";
import { ICategory, IErrors, IMeta } from "@types";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string()
    .matches(/^[A-Za-z0-9-_.~]*$/, "Invalid format")
    .required("Code is required"),
});

const CreateCategory: NextPage<{
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const handleOnSubmit = async (values: CreateCategoryDTO) => {
    try {
      await CategoryService.create(values);
      toast.success("Sub-Category created successfully");
    } catch (e) {
      const error = e as any;
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
          <title>Category - Create</title>
        </Head>

        <div className="prose">
          <h1>Create Category</h1>
        </div>

        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: "",
              code: "",
            }}
            onSubmit={handleOnSubmit}
            validationSchema={ValidationSchema}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={false}
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
                  label="Code"
                  hint="This should be unique"
                  name="code"
                  placeholder="e.g. Res-1"
                  classes={{
                    wrapper: "w-full max-w-sm",
                    input: errors.code && touched.code ? "border-red-500" : "",
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
                  Create
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </>
    </DefaultLayout>
  );
};

export default CreateCategory;
