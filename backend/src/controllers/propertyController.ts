import { Request, Response } from "express";
import { properties } from "../data/data";
import { Property } from "../models/Property";

let nextPropertyId = 1;

export const getProperties = (_req: Request, res: Response) => {
  res.json(properties);
};

export const getPropertyById = (req: Request, res: Response) => {
  const prop = properties.find((p) => p.id === Number(req.params.id));
  if (!prop) return res.status(404).json({ message: "Property not found" });
  res.json(prop);
};

export const createProperty = (req: Request, res: Response) => {
  const newProp: Property = {
    id: nextPropertyId++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  properties.push(newProp);
  res.status(201).json(newProp);
};

export const updateProperty = (req: Request, res: Response) => {
  const idx = properties.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1)
    return res.status(404).json({ message: "Property not found" });

  properties[idx] = {
    ...properties[idx],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(properties[idx]);
};

export const deleteProperty = (req: Request, res: Response) => {
  const idx = properties.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1)
    return res.status(404).json({ message: "Property not found" });

  const [deleted] = properties.splice(idx, 1);
  res.json(deleted);
};
