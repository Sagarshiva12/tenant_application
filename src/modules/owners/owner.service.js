
import * as OwnerModel from "./owner.model.js";

export const createOwner = async (data) => {
  const existingOwner = await OwnerModel.findByEmail(data.email);

  if (existingOwner) {
    throw new Error("OWNER_ALREADY_EXISTS");
  }

  return OwnerModel.create(data);
};

export const getAllOwners = async (query) => {
  const { page, limit, search, status } = query;

  const skip = (page - 1) * limit;

  const where = {
    ...(status
      ? { status }
      : { status: { not: "ARCHIVED" } }),

    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search } },
          ],
        }
      : {}),
  };

  const [owners, total] = await Promise.all([
    OwnerModel.findAll(where, skip, limit),
    OwnerModel.count(where),
  ]);

  return {
    owners,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getOwnerById = async (id) => {
  const owner = await OwnerModel.findActiveById(id);

  if (!owner) {
    throw new Error("OWNER_NOT_FOUND");
  }

  return owner;
};

export const updateOwner = async (id, data) => {
  await getOwnerById(id);

  return OwnerModel.update(id, data);
};

export const updateOwnerStatus = async (id, status) => {
  await getOwnerById(id);

  return OwnerModel.update(id, { status });
};

export const deleteOwner = async (id) => {
  await getOwnerById(id);

  return OwnerModel.update(id, { status: "ARCHIVED" });
};
