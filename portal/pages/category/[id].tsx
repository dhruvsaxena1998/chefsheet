import type { NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";

import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import TextInput from "../../shared/components/TextInput";
import {
  ICategory,
  getCategoryById,
  updateCategory,
} from "../../shared/services/category";
import { useRouter } from "next/router";
import Loader from "../../shared/components/Loader";
import { ICategory } from "../../types/category";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const EditCategory: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    data: categoryItem,
    isLoading: categoryItemIsLoading,
    isError: categoryItemIsError,
  } = useQuery(
    [`category-${id}`, id],
    () => (id ? getCategoryById(id) : null),
    { cacheTime: 0, refetchOnWindowFocus: false }
  );
  const category = categoryItem?.data as ICategory;

  const {
    mutate: updateCategoryMutation,
    isLoading: updateCategoryIsLoading,
    isError: updateCategoryIsError,
    isSuccess: updateCategoryIsSuccess,
  } = useMutation(updateCategory);

  const handleOnSubmit = async (values: Pick<ICategory, "name">) => {
    try {
      updateCategoryMutation({
        id: category.id,
        category: {
          name: values.name,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (categoryItemIsError) {
    return <div className="alert my-4 alert-danger">Something went wrong!</div>;
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Category - Edit</title>
        </Head>

        <div className="prose">
          <h1>Edit Category</h1>
        </div>

        <main className="my-4 p-4">
          {(updateCategoryIsError || updateCategoryIsSuccess) && (
            <div
              className={clsx([
                "alert my-4",
                {
                  "alert-success": updateCategoryIsSuccess,
                  "alert-danger": updateCategoryIsError,
                },
              ])}
            >
              <span>
                {updateCategoryIsSuccess && "Category updated successfully"}
                {updateCategoryIsError && "Error updating category"}
              </span>
            </div>
          )}

          {categoryItemIsLoading ? (
            <Loader />
          ) : (
            <Formik
              initialValues={{
                name: category?.name || "",
              }}
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

                  <button
                    type="submit"
                    className={clsx([
                      "my-4 btn w-full max-w-sm",
                      { "bg-primary": isValid },
                      {
                        loading:
                          isValidating ||
                          isSubmitting ||
                          updateCategoryIsLoading,
                      },
                      {
                        disabled:
                          !isValid ||
                          isValidating ||
                          isSubmitting ||
                          updateCategoryIsLoading,
                      },
                    ])}
                  >
                    Update
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </main>
      </>
    </DefaultLayout>
  );
};

export default EditCategory;
