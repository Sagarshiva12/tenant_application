
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Duplicate record already exists",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Record not found",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
