import type { NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";

import { Formik, Form, FormikHelpers, Field } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import TextInput from "../../shared/components/TextInput";
import { getCategories } from "../../shared/services/category";
import {
  ISubCategory,
  createSubCategory,
  getSubCategoriesCount,
} from "../../shared/services/sub-category";
import { Category } from "../../types/category";

const initialValues: ISubCategory = {
  name: "",
  code: "",
  category: "",
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

          getSubCategoriesCount(value).then(({ data: { count } }) => {
            return resolve(count === 0);
          });
        })
    ),
  category: Yup.string()
    .required("Category is required")
    .test("not-null", "Category is required", (value) => {
      if (!value) return false;
      if (value === "null") return false;
      return true;
    }),
});

const CreateSubCategory: NextPage = () => {
  const categories = useQuery("categories", getCategories, {
    refetchOnWindowFocus: false,
  });

  const {
    mutate: createSubCategoryMutation,
    isLoading: addSubCategoryIsLoading,
    isError: addSubCategoryIsError,
    isSuccess: addSubCategoryIsSuccess,
  } = useMutation(createSubCategory);

  const handleOnSubmit = async (values: ISubCategory) => {
    try {
      createSubCategoryMutation(values);
      console.log(values);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>SubCategory - Create</title>
        </Head>

        <div className="prose">
          <h1>Create Sub-Category</h1>
        </div>

        <main className="my-4 p-4">
          {(addSubCategoryIsError || addSubCategoryIsSuccess) && (
            <div
              className={clsx([
                "alert my-4",
                {
                  "alert-success": addSubCategoryIsSuccess,
                  "alert-danger": addSubCategoryIsError,
                },
              ])}
            >
              <span>
                {addSubCategoryIsSuccess && "Category created successfully"}
                {addSubCategoryIsError && "Error creating category"}
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

                <TextInput
                  label="Category"
                  name="category"
                  type="select"
                  classes={{
                    wrapper: "w-full max-w-sm",
                  }}
                >
                  <>
                    <option value="null">Please select category</option>
                    {categories.isSuccess &&
                      categories.data.data.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </>
                </TextInput>

                <button
                  type="submit"
                  className={clsx([
                    "my-4 btn w-full max-w-sm",
                    { "bg-primary": isValid },
                    {
                      loading:
                        isValidating || isSubmitting || addSubCategoryIsLoading,
                    },
                    {
                      disabled:
                        !isValid ||
                        isValidating ||
                        isSubmitting ||
                        addSubCategoryIsLoading,
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

export default CreateSubCategory;
