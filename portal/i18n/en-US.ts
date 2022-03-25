export const strings = {
  logout: "Logout",
  search: "Search",
  chefsheet: "Chefsheet",
  buttons: {
    create: "Create",
    update: "Update",
    edit: "Edit",
    delete: "Delete",
  },
  table: {
    name: "Name",
    code: "Code",
  },
  messages: {
    internal: "Something went wrong",
  },
  category: {
    titles: {
      index: "Chefsheet - Categories",
      create: "Category - Create",
      edit: "Category - Edit",
    },
    headings: {
      index: "Categories",
      create: "Create Category",
      edit: "Edit Category",
    },
    form: {
      name: "Name",
      name_placeholder: 'e.g. "Chicken"',
      name_error_required: "Name is required",
      code: "Code",
      code_hint: "This should be unique",
      code_placeholder: 'e.g. "chicken-1"',
      code_error_invalid: "Invalid format",
      code_error_required: "Code is required",
    },
    messages: {
      create_success: "Category created successfully",
      delete_success: "Category deleted sucessfully",
      error_404: "Category not found :(",
    },
  },
  sub_category: {
    titles: {
      index: "Chefsheet - Sub Categories",
      create: "SubCategory - Create",
      edit: "SubCategory - Edit",
    },
    headings: {
      index: "Sub - Categories",
      create: "Create Sub-Category",
      edit: "Edit Sub-Category",
    },
    table: {
      category: "Category",
    },
    form: {
      name: "Name",
      name_placeholder: 'e.g. "Chicken"',
      name_error_required: "Name is required",
      code: "Code",
      code_hint: "This should be unique",
      code_placeholder: 'e.g. "chicken-1"',
      code_error_invalid: "Invalid format",
      code_error_required: "Code is required",
      category: "Category",
      category_option: "Please select category",
      category_error_invalid: "Category is invalid",
      category_error_required: "Category is required",
    },
    messages: {
      create_success: "Sub-Category created successfully",
      delete_success: "Sub-Category deleted sucessfully",
      error_404: "Sub-Category not found :(",
    },
  },
};
