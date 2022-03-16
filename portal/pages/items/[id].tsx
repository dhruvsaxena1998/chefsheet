import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import { Formik, Form } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

import DefaultLayout from "../../layouts/DefaultLayout";
import { TextInput } from "@shared/components";
import {
  ItemsDTO,
  ItemService,
  CategoryService,
  SubCategoryService,
} from "@shared/services";

import type { GetServerSideProps, NextPage } from "next";
import { ICategory, IErrors, IMeta, ISubCategory, Items } from "@types";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().min(10),
  quantity: Yup.number()
    .moreThan(0, "Quantity must be greater than 0")
    .required("Quantity is required"),
  expiration_date: Yup.date()
    .min(new Date(), "Expiration date must be in the future")
    .required("Expiration date is required"),
  category: Yup.string()
    .required("Category is required")
    .test("invalid", "Category is invalid", (value) => value !== "null"),
  sub_category: Yup.string()
    .required("Sub-Category is required")
    .test("invalid", "Sub-Category is invalid", (value) => value !== "null"),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = Number(ctx.params?.id);

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
        item,
        categories,
      },
    };
  } catch (e) {
    return { props: { item: {}, categories: [] } };
  }
};

const EditItem: NextPage<{
  item: Items;
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

  useEffect(() => {
    handleCategoryChange(props.item?.category?.data?.id!);
  }, [props.item]);

  const handleCategoryChange = async (categoryId: number) => {
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
      toast.error("Something went wrong");
    } finally {
      NProgress.done();
    }
  };

  const handleOnSubmit = async (values: ItemsDTO) => {
    NProgress.start();
    try {
      await ItemService.update(props.item?.id!, values);
      toast.success("Item updated successfully");
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

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Items - Create</title>
        </Head>

        <div className="prose">
          <h1>Create Items</h1>
        </div>

        <main className="my-4 p-4">
          <Formik
            initialValues={{
              name: props.item?.name || "",
              description: props.item?.description || "",
              expiration_date: props.item?.expiration_date || "",
              quantity: props.item?.quantity,
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
                      label="Name"
                      name="name"
                      placeholder="e.g. Reusable"
                      classes={{
                        wrapper: "w-full max-w-sm",
                        input:
                          errors.name && touched.name ? "border-red-500" : "",
                      }}
                    />
                    <TextInput
                      label="Quantity"
                      name="quantity"
                      placeholder="e.g. 100"
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
                      label="Expiration Date"
                      name="expiration_date"
                      placeholder="e.g. 100"
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
                      label="Category"
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
                        <option value="null">Please select category</option>
                        {props.categories.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </>
                    </TextInput>

                    <TextInput
                      label="Sub Category"
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
                        <option value="null">Please select sub category</option>
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
                      label="Description"
                      name="description"
                      placeholder="e.g. lorem ipsum"
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

export default EditItem;
