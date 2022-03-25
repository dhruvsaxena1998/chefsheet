import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { CategoryService } from "@shared/services";

import { ICategory } from "@types";
import type { GetServerSideProps, NextPage } from "next";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);

  try {
    const { data } = await CategoryService.findOne(id);

    const { data: category } = data;
    return {
      props: {
        id,
        category,
      },
    };
  } catch (e) {
    return { props: { id, category: null } };
  }
};

const EditCategory: NextPage<{
  id: number;
  category?: ICategory;
}> = (props) => {
  const handleOnSubmit = async (values: any) => {
    try {
      await CategoryService.update(props.category!.id!, values);
    } catch (e) {
      console.error(e);
    }
  };

  if (!props.category) {
    return (
      <DefaultLayout>
        <Error404 title="Category" message={`Category with ID-${props.id} not found! :(`} />
      </DefaultLayout>
    );
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
          <Formik
            initialValues={{
              name: props?.category?.name || "",
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

export default EditCategory;
