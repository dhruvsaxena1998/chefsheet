export interface IProfileImage {
  id?: number;
  name: string;
  alternativeText: string;
  caption: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext: ".png" | ".jpg" | ".jpeg" | ".gif" | ".svg" | ".webp";
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
