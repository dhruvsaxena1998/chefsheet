import type { NextPage } from "next";
import clsx from "clsx";
import Head from "next/head";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";

import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import TextInput from "../../shared/components/TextInput";

import { useRouter } from "next/router";
import Loader from "../../shared/components/Loader";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const EditStaff: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const handleOnSubmit = async (values: any) => {
    try {
      console.log(values);
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
            initialValues={{
              name: "",
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

export default EditStaff;
