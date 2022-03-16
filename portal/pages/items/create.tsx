import clsx from "clsx";
import Head from "next/head";

import * as Yup from "yup";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import { Formik, Form } from "formik";
import { ChangeEvent, useState } from "react";

import DefaultLayout from "../../layouts/DefaultLayout";
import { TextInput } from "@shared/components";
import {
  ItemsDTO,
  ItemService,
  CategoryService,
  SubCategoryService,
} from "@shared/services";

import type { GetServerSideProps, NextPage } from "next";
import { ICategory, IErrors, IMeta, ISubCategory } from "@types";

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

const CreateItem: NextPage<{
  categories: ICategory[];
  meta: IMeta;
  error?: IErrors;
}> = (props) => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

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
      await ItemService.create(values);
      toast.success("Item created successfully");
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
              name: "",
              description: "",
              expiration_date: "",
              quantity: 0,
              category: "null",
              sub_category: "",
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
                        <option value="null">Please select category</option>
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
                  Create
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </>
    </DefaultLayout>
  );
};

export default CreateItem;
