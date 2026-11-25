
import prisma from "../../config/database.js";

export const create = (data) => {
  return prisma.owner.create({ data });
};

export const findAll = (where, skip, take) => {
  return prisma.owner.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
};

export const count = (where) => {
  return prisma.owner.count({ where });
};

export const findById = (id) => {
  return prisma.owner.findUnique({
    where: { id },
  });
};

export const findActiveById = (id) => {
  return prisma.owner.findFirst({
    where: {
      id,
      status: { not: "ARCHIVED" },
    },
  });
};

export const findByEmail = (email) => {
  return prisma.owner.findUnique({
    where: { email },
  });
};

export const update = (id, data) => {
  return prisma.owner.update({
    where: { id },
    data,
  });
};
