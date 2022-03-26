export const strings = {
  chefsheet: "Chefsheet",
  buttons: {
    create: "Create",
    update: "Update",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    logout: "Logout",
    back: "Go Back",
  },
  options: {
    search: "Search",
    categories: "Categories",
    sub_categories: "Sub Categories",
    items: "Items",
    staff: "Staff Members",
    users: "Users",
  },
  table: {
    name: "Name",
    code: "Code",
    actions: "Actions",
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
  items: {
    titles: {
      index: "Cheffsheet - Items",
      create: "Items - Create",
      edit: "Items - Edit",
    },
    headings: {
      index: "Items",
      create: "Create Item",
      edit: "Edit Item",
    },
    table: {
      category: "Category",
    },
    form: {
      name: "Name",
      name_placeholder: 'e.g. "Chicken"',
      name_error_required: "Name is required",
      description: "Description",
      description_placeholder: 'e.g. "Grilled chicken"',
      quantity: "Quantity",
      quantity_placeholder: "e.g. 1000",
      quantity_error_min: "Quantity must be greater than 0",
      quantity_error_required: "Quantity is required",
      expiration_date: "Expiry Date",
      expiration_date_placeholder: "dd-mm-yyyy",
      expiration_date_error_min: "Expiration date must be in the future",
      expiration_date_error_required: "Expiry date is required",
      category: "Category",
      category_option: "Please select category",
      category_error_invalid: "Category is invalid",
      category_error_required: "Category is required",
      sub_category: "Sub Category",
      sub_category_option: "Please select sub category",
      sub_category_error_invalid: "Sub category is invalid",
      sub_category_error_required: "Sub category is required",
    },
    messages: {
      create_success: "Item created successfully",
      update_success: "Item updated successfully",
      delete_success: "Item deleted sucessfully",
      error_404: "Item not found :(",
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
  users: {
    titles: {
      index: "Cheffsheet - Users",
      create: "Users - Create",
      edit: "Users - Edit",
    },
    headings: {
      index: "Users",
      create: "Create User",
      edit: "Edit User",
    },
    table: {
      name: "Name",
      contact_number: "Contact Number",
      role: "Role",
    },
    form: {
      name: "Name",
      name_placeholder: 'e.g. "Chicken"',
      name_error_required: "Name is required",
      email: "Email",
      email_placeholder: 'e.g. "someone@example.com"',
      email_error_invalid: "Invalid email",
      email_error_required: "Email is required",
      contact_number: "Contact Number",
      contact_number_placeholder: 'e.g. "1234567890"',
      contact_number_error_invalid: "Invalid contact number",
      contact_number_error_required: "Contact number is required",
    },
    messages: {
      create_success: "User created successfully",
      update_success: "User updated successfully",
      delete_success: "User deleted sucessfully",
      error_404: "User not found :(",
    },
  },
  misc: {
    pick_category: "Pick a category",
  },
};
