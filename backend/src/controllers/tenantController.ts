import { Request, Response } from "express";
import { tenants } from "../data/data";
import { Tenant } from "../models/Tenant";

// simple auto-increment
let nextTenantId = 1;

// GET /tenants[?propertyId=]
export const getTenants = (req: Request, res: Response) => {
  const { propertyId } = req.query;
  if (propertyId) {
    const filtered = tenants.filter((t) => t.propertyId === Number(propertyId));
    return res.json(filtered);
  }
  res.json(tenants);
};

// GET /tenants/:id
export const getTenantById = (req: Request, res: Response) => {
  const tenant = tenants.find((t) => t.id === Number(req.params.id));
  if (!tenant) return res.status(404).json({ message: "Tenant not found" });
  res.json(tenant);
};

// POST /tenants
export const createTenant = (req: Request, res: Response) => {
  const { propertyId, firstName, lastName, age, email, phoneNumber } = req.body;
  // ensure propertyId exists? (stretch: check against properties array)
  const newTenant: Tenant = {
    id: nextTenantId++,
    propertyId,
    firstName,
    lastName,
    age,
    email,
    phoneNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tenants.push(newTenant);
  res.status(201).json(newTenant);
};

// PUT /tenants/:id
export const updateTenant = (req: Request, res: Response) => {
  const idx = tenants.findIndex((t) => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Tenant not found" });

  tenants[idx] = {
    ...tenants[idx],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(tenants[idx]);
};

// DELETE /tenants/:id
export const deleteTenant = (req: Request, res: Response) => {
  const idx = tenants.findIndex((t) => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Tenant not found" });

  const [deleted] = tenants.splice(idx, 1);
  res.json(deleted);
};
