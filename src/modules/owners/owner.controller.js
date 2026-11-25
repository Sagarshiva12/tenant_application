
import * as ownerService from "./owner.service.js";

const handleError = (error, res) => {
  if (error.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Owner email already exists",
    });
  }

  if (error.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Owner not found",
    });
  }

  console.error("Owner API Error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export const createOwner = async (req, res) => {
  try {
    const owner = await ownerService.createOwner(req.validated.body);

    return res.status(201).json({
      success: true,
      message: "Owner created successfully",
      data: owner,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

export const getAllOwners = async (req, res) => {
  try {
    const result = await ownerService.getAllOwners(
      req.validated.query
    );

    return res.status(200).json({
      success: true,
      message: "Owners fetched successfully",
      data: result.owners,
      pagination: result.pagination,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

export const getOwnerById = async (req, res) => {
  try {
    const owner = await ownerService.getOwnerById(req.validated.params.id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Owner fetched successfully",
      data: owner,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

export const updateOwner = async (req, res) => {
  try {
    const owner = await ownerService.updateOwner(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Owner updated successfully",
      data: owner,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

export const updateOwnerStatus = async (req, res) => {
  try {
    const owner = await ownerService.updateOwnerStatus(
      req.params.id,
      req.body.status
    );

    return res.status(200).json({
      success: true,
      message: "Owner status updated successfully",
      data: owner,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteOwner = async (req, res) => {
  try {
    const owner = await ownerService.deleteOwner(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Owner archived successfully",
      data: owner,
    });
  } catch (error) {
    return handleError(error, res);
  }
};
