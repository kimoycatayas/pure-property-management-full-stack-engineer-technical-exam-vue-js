import { Request, Response } from "express";
import { notes } from "../data/data";
import { Note } from "../models/Note";

let nextNoteId = 1;

// GET /notes[?propertyId=]
export const getNotes = (req: Request, res: Response) => {
  const { propertyId } = req.query;
  if (propertyId) {
    return res.json(notes.filter((n) => n.propertyId === Number(propertyId)));
  }
  res.json(notes);
};

// GET /notes/:id
export const getNoteById = (req: Request, res: Response) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

// POST /notes
export const createNote = (req: Request, res: Response) => {
  const { propertyId, title, description, reminderDate } = req.body;
  const newNote: Note = {
    id: nextNoteId++,
    propertyId,
    title,
    description,
    reminderDate: reminderDate ? new Date(reminderDate) : undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

// PUT /notes/:id
export const updateNote = (req: Request, res: Response) => {
  const idx = notes.findIndex((n) => n.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Note not found" });

  const updated: Partial<Note> = {
    ...req.body,
    reminderDate: req.body.reminderDate
      ? new Date(req.body.reminderDate)
      : notes[idx]?.reminderDate ?? undefined,
  };

  if (notes[idx]) {
    notes[idx] = {
      id: notes[idx].id,
      propertyId:
        updated.propertyId !== undefined
          ? updated.propertyId
          : notes[idx]!.propertyId,
      title: updated.title !== undefined ? updated.title : notes[idx]!.title,
      description:
        updated.description !== undefined
          ? updated.description
          : notes[idx]!.description,
      reminderDate:
        updated.reminderDate !== undefined
          ? updated.reminderDate
          : notes[idx]!.reminderDate,
      createdAt: notes[idx].createdAt,
      updatedAt: new Date(),
    };
    res.json(notes[idx]);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

// DELETE /notes/:id
export const deleteNote = (req: Request, res: Response) => {
  const idx = notes.findIndex((n) => n.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Note not found" });

  const [deleted] = notes.splice(idx, 1);
  res.json(deleted);
};
