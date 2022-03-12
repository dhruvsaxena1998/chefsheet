import type { GetServerSideProps, NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";

import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import TextInput from "../../shared/components/TextInput";

interface IProps {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

const EditCategory: NextPage<IProps> = (props) => {
  console.log(props);
  const handleOnSubmit = async (values: any) => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

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
            initialValues={{}}
            onSubmit={handleOnSubmit}
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
