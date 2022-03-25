import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { CategoryService } from "@shared/services";

import { ICategory } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "@shared/hooks";

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
  const t = useTranslation();

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(t.category.form.name_error_required),
  });

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
        <Error404
          title={t.category.headings.index}
          message={t.category.messages.error_404}
        />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.category.titles.edit}</title>
        </Head>

        <div className="prose">
          <h1>{t.category.headings.edit}</h1>
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
                  label={t.category.form.name}
                  name="name"
                  placeholder={t.category.form.name_placeholder}
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
                  {t.buttons.update}
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
