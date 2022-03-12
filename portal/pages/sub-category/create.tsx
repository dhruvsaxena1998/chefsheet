import type { GetServerSideProps, NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import { ICategory, IErrors, IMeta } from "@types";
import { TextInput } from "@shared/components";
import {
  SubCategoryService,
  CreateSubCategoryDTO,
  CategoryService,
} from "@shared/services";

import DefaultLayout from "../../layouts/DefaultLayout";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Code is required"),
  category: Yup.string()
    .required("Category is required")
    .test("invalid", "Category is invalid", (value) => value !== "null"),
});

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await CategoryService.find({
      pagination: {
        start: 0,
        limit: 100,
      },
    });

    const { data: categories, meta } = data;

    return {
      props: {
        categories,
        meta,
      },
    };
  } catch (e) {
    return { props: { data: [] } };
  }
};

const CreateSubCategory: NextPage<{
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const handleOnSubmit = async (values: CreateSubCategoryDTO) => {
    try {
      await SubCategoryService.create(values);
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
          <title>SubCategory - Create</title>
        </Head>

        <div className="prose">
          <h1>Create Sub-Category</h1>
        </div>

        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: "",
              code: "",
              category: "null",
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

                <TextInput
                  label="Code"
                  hint="This should be unique"
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
                    {props.categories.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </>
                </TextInput>

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

export default CreateSubCategory;
