import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import { Formik, Form } from "formik";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import DefaultLayout from "../../layouts/DefaultLayout";
import { Error404, TextInput } from "@shared/components";
import {
  ItemsDTO,
  ItemService,
  CategoryService,
  SubCategoryService,
} from "@shared/services";

import type { GetServerSideProps, NextPage } from "next";
import { ICategory, IErrors, IMeta, ISubCategory, Items } from "@types";
import { useTranslation } from "@shared/hooks";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);
  try {
    const [{ data: itemData }, { data: categoryData }] = await Promise.all([
      ItemService.findOne(id, {
        populate: ["category", "sub_category"],
      }),
      CategoryService.find({
        pagination: {
          limit: 100,
        },
      }),
    ]);

    const { data: categories } = categoryData;
    const { data: item } = itemData;

    return {
      props: {
        id,
        item,
        categories,
      },
    };
  } catch (e) {
    return { props: { id, item: null, categories: [] } };
  }
};

const EditItem: NextPage<{
  id?: number;
  item?: Items;
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const t = useTranslation();

  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

  const handleCategoryChange = useCallback(
    async (categoryId: number) => {
      NProgress.start();
      try {
        const { data } = await SubCategoryService.find({
          pagination: {
            limit: 100,
          },
          filters: {
            category: {
              id: {
                $eq: categoryId,
              },
            },
          },
        });

        const { data: subCategories } = data;
        setSubCategories(subCategories);
      } catch (e) {
        toast.error(t.messages.internal);
      } finally {
        NProgress.done();
      }
    },
    [t.messages.internal]
  );

  useEffect(() => {
    handleCategoryChange(props.item?.category?.data?.id!);
  }, [handleCategoryChange, props.item]);

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().min(10),
    quantity: Yup.number()
      .moreThan(0, t.items.form.quantity_error_min)
      .required(t.items.form.quantity_error_required),
    expiration_date: Yup.date()
      .min(new Date(), t.items.form.expiration_date_error_min)
      .required(t.items.form.expiration_date_error_required),
    category: Yup.string()
      .required(t.items.form.category_error_required)
      .test(
        "invalid",
        t.items.form.category_error_invalid,
        (value) => value !== "null"
      ),
    sub_category: Yup.string()
      .required(t.items.form.sub_category_error_required)
      .test(
        "invalid",
        t.items.form.sub_category_error_invalid,
        (value) => value !== "null"
      ),
  });

  const handleOnSubmit = async (values: ItemsDTO) => {
    NProgress.start();
    try {
      await ItemService.update(props.item?.id!, values);
      toast.success(t.items.messages.update_success);
    } catch (e) {
      const error = e as any;
      const { data, status } = error?.response || {};
      if (status === 400) {
        const { message } = data?.error as IErrors;
        toast.error(message);
      }
    } finally {
      NProgress.done();
    }
  };

  if (!props.item) {
    return (
      <DefaultLayout>
        <Error404
          title={t.items.headings.index}
          message={t.items.messages.error_404}
        />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t.items.titles.edit}</title>
        </Head>

        <div className="prose">
          <h1>{t.items.headings.edit}</h1>
        </div>

        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: props.item?.name || "",
              description: props.item?.description || "",
              expiration_date: props.item?.expiration_date || "",
              quantity: props.item?.quantity!,
              category: props.item?.category?.data?.id || "null",
              sub_category: props.item?.sub_category?.data?.id || "null",
            }}
            onSubmit={handleOnSubmit}
            validationSchema={ValidationSchema}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={true}
          >
            {({ isSubmitting, isValidating, isValid, errors, touched }) => (
              <Form>
                <div className="flex justify-start gap-8">
                  <div className="w-96">
                    <TextInput
                      label={t.items.form.name}
                      name="name"
                      placeholder={t.items.form.name_placeholder}
                      classes={{
                        wrapper: "w-full max-w-sm",
                        input:
                          errors.name && touched.name ? "border-red-500" : "",
                      }}
                    />
                    <TextInput
                      label={t.items.form.quantity}
                      name="quantity"
                      placeholder={t.items.form.quantity_placeholder}
                      type="number"
                      classes={{
                        wrapper: "w-full max-w-sm",
                        input:
                          errors.quantity && touched.quantity
                            ? "border-red-500"
                            : "",
                      }}
                    />

                    <TextInput
                      label={t.items.form.expiration_date}
                      name="expiration_date"
                      placeholder={t.items.form.expiration_date_placeholder}
                      type="date"
                      classes={{
                        wrapper: "w-full max-w-sm",
                        input:
                          errors.expiration_date && touched.expiration_date
                            ? "border-red-500"
                            : "",
                      }}
                    />

                    <TextInput
                      label={t.items.form.category}
                      name="category"
                      type="select"
                      classes={{
                        wrapper: "w-full max-w-sm",
                        input:
                          errors.category && touched.category
                            ? "border-red-500"
                            : "",
                      }}
                      onChange={(value: any, event: ChangeEvent<any>) => {
                        handleCategoryChange(value);
                      }}
                    >
                      <>
                        <option value="null">
                          {t.items.form.category_option}
                        </option>
                        {props.categories.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </>
                    </TextInput>

                    <TextInput
                      label={t.items.form.sub_category}
                      name="sub_category"
                      type="select"
                      disabled={subCategories.length === 0}
                      classes={{
                        wrapper: "w-full max-w-sm",
                        input:
                          errors.sub_category && touched.sub_category
                            ? "border-red-500"
                            : "",
                      }}
                    >
                      <>
                        <option value="null">
                          {t.items.form.sub_category_option}
                        </option>
                        {subCategories.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </>
                    </TextInput>
                  </div>
                  <div className="flex-1">
                    <TextInput
                      label={t.items.form.description}
                      name="description"
                      placeholder={t.items.form.description_placeholder}
                      type="textarea"
                      classes={{
                        wrapper: "",
                        input: clsx("h-96", {
                          "border-red-500":
                            errors.description && touched.description,
                        }),
                      }}
                    />
                  </div>
                </div>

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

export default EditItem;
