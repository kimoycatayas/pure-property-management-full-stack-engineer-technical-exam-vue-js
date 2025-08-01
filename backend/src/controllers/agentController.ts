import { Request, Response } from "express";
import { agents } from "../data/data";
import { PropertyAgent } from "../models/PropertyAgent";

let nextId = 1;

export const getAgents = (_req: Request, res: Response) => {
  res.json(agents);
};

export const getAgentById = (req: Request, res: Response) => {
  const agent = agents.find((a) => a.id === Number(req.params.id));
  if (!agent) return res.status(404).json({ message: "Agent not found" });
  res.json(agent);
};

export const createAgent = (req: Request, res: Response) => {
  const newAgent: PropertyAgent = {
    id: nextId++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  agents.push(newAgent);
  res.status(201).json(newAgent);
};

export const updateAgent = (req: Request, res: Response) => {
  const index = agents.findIndex((a) => a.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Agent not found" });

  agents[index] = {
    ...agents[index],
    ...req.body,
    updatedAt: new Date(),
  };
  res.json(agents[index]);
};

export const deleteAgent = (req: Request, res: Response) => {
  const index = agents.findIndex((a) => a.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Agent not found" });

  const [deleted] = agents.splice(index, 1);
  res.json(deleted);
};
