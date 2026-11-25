
import { Router } from "express";

import * as ownerController from "./owner.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import {
  createOwnerSchema,
  updateOwnerSchema,
  updateOwnerStatusSchema,
  ownerIdSchema,
  ownerQuerySchema,
} from "./owner.validation.js";

const router = Router();

// All owner endpoints require login
router.use(authenticate);

// GET all owners
router.get(
  "/",
  validate(ownerQuerySchema, "query"),
  ownerController.getAllOwners
);

// CREATE owner
router.post(
  "/",
  validate(createOwnerSchema),
  ownerController.createOwner
);

// GET owner by ID
router.get(
  "/:id",
  validate(ownerIdSchema, "params"),
  ownerController.getOwnerById
);

// UPDATE owner
router.put(
  "/:id",
  validate(ownerIdSchema, "params"),
  validate(updateOwnerSchema),
  ownerController.updateOwner
);

// UPDATE owner status
router.patch(
  "/:id/status",
  validate(ownerIdSchema, "params"),
  validate(updateOwnerStatusSchema),
  ownerController.updateOwnerStatus
);

// SOFT DELETE owner
router.delete(
  "/:id",
  validate(ownerIdSchema, "params"),
  ownerController.deleteOwner
);

export default router;
