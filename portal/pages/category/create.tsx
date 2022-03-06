import type { NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";
import { useMutation } from "react-query";
import * as Yup from "yup";

import { Formik, Form, FormikHelpers } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import TextInput from "../../shared/components/TextInput";
import {
  getCategoriesCount,
  createCategory,
  ICategory,
} from "../../shared/services/category";

const initialValues: ICategory = {
  name: "",
  code: "",
};

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string()
    .required("Code is required")
    .test(
      "unique",
      "Code is already taken",
      (value) =>
        new Promise((resolve) => {
          if (!value) return resolve(false);

          getCategoriesCount(value).then(({ data: { count } }) => {
            return resolve(count === 0);
          });
        })
    ),
});

const CreateCategory: NextPage = () => {
  const {
    mutate: createCategoryMutation,
    isLoading: addCategoryIsLoading,
    isError: addCategoryIsError,
    isSuccess: addCategoryIsSuccess,
  } = useMutation(createCategory);

  const handleOnSubmit = async (
    values: ICategory,
  ) => {
    try {
      createCategoryMutation(values);
    } catch (e) {
      console.error(e);
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
          {(addCategoryIsError || addCategoryIsSuccess) && (
            <div
              className={clsx([
                "alert my-4",
                {
                  "alert-success": addCategoryIsSuccess,
                  "alert-danger": addCategoryIsError,
                },
              ])}
            >
              <span>
                {addCategoryIsSuccess && "Category created successfully"}
                {addCategoryIsError && "Error creating category"}
              </span>
            </div>
          )}
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={ValidationSchema}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={true}
          >
            {({ isSubmitting, isValidating, isValid }) => (
              <Form>
                <TextInput
                  label="Name"
                  name="name"
                  placeholder="e.g. Reusable"
                  classes={{
                    wrapper: "max-w-sm",
                  }}
                />

                <TextInput
                  label="Code"
                  name="code"
                  placeholder="e.g. Res-1"
                  classes={{
                    wrapper: "w-full max-w-sm",
                  }}
                />

                <button
                  type="submit"
                  className={clsx([
                    "my-4 btn w-full max-w-sm",
                    { "bg-primary": isValid },
                    {
                      loading:
                        isValidating || isSubmitting || addCategoryIsLoading,
                    },
                    {
                      disabled:
                        !isValid ||
                        isValidating ||
                        isSubmitting ||
                        addCategoryIsLoading,
                    },
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
