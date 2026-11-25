
import { z } from "zod";

export const createOwnerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

export const updateOwnerSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field is required" }
);

export const updateOwnerStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const ownerIdSchema = z.object({
  id: z.string().min(1),
});

export const ownerQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
});
