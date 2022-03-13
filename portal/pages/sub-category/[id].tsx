import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { SubCategoryService } from "@shared/services";

import { ISubCategory } from "@types";
import type { GetServerSideProps, NextPage } from "next";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);

  try {
    const { data } = await SubCategoryService.findOne(id, {
      populate: ["category"],
    });

    const { data: subCategory } = data;
    return {
      props: {
        id,
        subCategory,
      },
    };
  } catch (e) {
    return { props: { id, subCategory: null } };
  }
};

const EditCategory: NextPage<{
  id: number;
  subCategory?: ISubCategory;
}> = (props) => {
  const handleOnSubmit = async (values: any) => {
    try {
      await SubCategoryService.update(props.subCategory!.id, values);
    } catch (e) {
      console.error(e);
    }
  };

  if (!props.subCategory) {
    return (
      <DefaultLayout>
        <Error404 message={`Sub-Category with ID-${props.id} not found! :(`} />
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
              name: props?.subCategory?.name || "",
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
