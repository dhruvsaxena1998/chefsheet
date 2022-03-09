import type { NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";

import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import TextInput from "../../shared/components/TextInput";

import {
  ISubCategory,
  getSubCategoryById,
  updateSubCategory,
} from "../../shared/services/sub-category";
import { useRouter } from "next/router";
import Loader from "../../shared/components/Loader";
import { SubCategory } from "../../types/category";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const EditCategory: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    data: subCategoryItem,
    isLoading: subCategoryItemIsLoading,
    isError: subCategoryItemIsError,
  } = useQuery(
    [`subcategory-${id}`, id],
    () => (id ? getSubCategoryById(id) : null),
    { cacheTime: 0, refetchOnWindowFocus: false }
  );
  const subCategory = subCategoryItem?.data as SubCategory;

  const {
    mutate: updateSubCategoryMutation,
    isLoading: updateSubCategoryIsLoading,
    isError: updateSubCategoryIsError,
    isSuccess: updateSubCategoryIsSuccess,
  } = useMutation(updateSubCategory);

  const handleOnSubmit = async (values: Pick<ISubCategory, "name">) => {
    try {
      updateSubCategoryMutation({
        id: subCategory.id,
        subcategory: {
          name: values.name,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (subCategoryItemIsError) {
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
          {(updateSubCategoryIsError || updateSubCategoryIsSuccess) && (
            <div
              className={clsx([
                "alert my-4",
                {
                  "alert-success": updateSubCategoryIsSuccess,
                  "alert-danger": updateSubCategoryIsError,
                },
              ])}
            >
              <span>
                {updateSubCategoryIsSuccess && "Category updated successfully"}
                {updateSubCategoryIsError && "Error updating category"}
              </span>
            </div>
          )}

          {subCategoryItemIsLoading ? (
            <Loader />
          ) : (
            <Formik
              initialValues={{
                name: subCategory?.name || "",
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
                          updateSubCategoryIsLoading,
                      },
                      {
                        disabled:
                          !isValid ||
                          isValidating ||
                          isSubmitting ||
                          updateSubCategoryIsLoading,
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
