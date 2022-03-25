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
import { useTranslation } from "@shared/hooks";

const CreateCategory: NextPage<{
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const t = useTranslation();

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(t.category.form.name_error_required),
    code: Yup.string()
      .matches(/^[A-Za-z0-9-_.~]*$/, t.category.form.code_error_invalid)
      .required(t.category.form.code_error_required),
  });

  const handleOnSubmit = async (values: CreateCategoryDTO) => {
    try {
      await CategoryService.create(values);
      toast.success(t.category.messages.create_success);
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
          <title>{t.category.titles.create}</title>
        </Head>

        <div className="prose">
          <h1>{t.category.headings.create}</h1>
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
                  label={t.category.form.name}
                  name="name"
                  placeholder={t.category.form.name_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label={t.category.form.code}
                  hint={t.category.form.code_hint}
                  name="code"
                  placeholder={t.category.form.code_placeholder}
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
                  {t.buttons.create}
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
