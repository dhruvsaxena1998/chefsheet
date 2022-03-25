import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import DefaultLayout from "../../layouts/DefaultLayout";
import { TextInput } from "@shared/components";
import {
  SubCategoryService,
  CreateSubCategoryDTO,
  CategoryService,
} from "@shared/services";

import type { GetServerSideProps, NextPage } from "next";
import { ICategory, IErrors, IMeta } from "@types";
import { useTranslation } from "@shared/hooks";

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
  const t = useTranslation();

  const handleOnSubmit = async (values: CreateSubCategoryDTO) => {
    try {
      await SubCategoryService.create(values);
      toast.success(t.sub_category.messages.create_success);
    } catch (e) {
      const error = e as any;
      const { data, status } = error?.response || {};
      if (status === 400) {
        const { message } = data?.error as IErrors;
        toast.error(message);
      }
    }
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(t.sub_category.form.name_error_required),
    code: Yup.string()
      .matches(/^[A-Za-z0-9-_.~]*$/, t.sub_category.form.code_error_invalid)
      .required(t.sub_category.form.code_error_required),
    category: Yup.string()
      .required(t.sub_category.form.category_error_required)
      .test(
        "invalid",
        t.sub_category.form.category_error_invalid,
        (value) => value !== "null"
      ),
  });

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.sub_category.titles.create}</title>
        </Head>

        <div className="prose">
          <h1>{t.sub_category.headings.create}</h1>
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
            {({ isSubmitting, isValidating, isValid, errors, touched }) => (
              <Form>
                <TextInput
                  label={t.sub_category.form.name}
                  name="name"
                  placeholder={t.sub_category.form.name_placeholder}
                  classes={{
                    wrapper: "max-w-sm",
                    input: errors.name && touched.name ? "border-red-500" : "",
                  }}
                />
                <TextInput
                  label={t.sub_category.form.code}
                  hint={t.sub_category.form.code_hint}
                  name="code"
                  placeholder={t.sub_category.form.code_placeholder}
                  classes={{
                    wrapper: "w-full max-w-sm",
                    input: errors.code && touched.code ? "border-red-500" : "",
                  }}
                />

                <TextInput
                  label={t.sub_category.form.category}
                  name="category"
                  type="select"
                  classes={{
                    wrapper: "w-full max-w-sm",
                    input:
                      errors.category && touched.category
                        ? "border-red-500"
                        : "",
                  }}
                >
                  <>
                    <option value="null">
                      {t.sub_category.form.category_option}
                    </option>
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

export default CreateSubCategory;
