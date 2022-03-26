import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "shared/components";
import { SubCategoryService } from "@shared/services";

import { ISubCategory } from "@types";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "@shared/hooks";
import { useMemo } from "react";

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
  const t = useTranslation();

  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t.sub_category.form.name_error_required),
      }),
    [t]
  );

  const handleOnSubmit = async (values: any) => {
    try {
      await SubCategoryService.update(props.subCategory!.id!, values);
    } catch (e) {
      console.error(e);
    }
  };

  if (!props.subCategory) {
    return (
      <DefaultLayout>
        <Error404
          title={t.sub_category.headings.index}
          message={t.sub_category.messages.error_404}
        />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.sub_category.titles.edit}</title>
        </Head>

        <div className="prose">
          <h1>{t.sub_category.headings.edit}</h1>
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
