import slug from 'slugify';

export const slugify = (value: string) => {
  return slug(value, {
    lower: true,
    trim: true,
  });
};
