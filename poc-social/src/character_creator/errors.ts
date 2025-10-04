// src/character_creator/errors.ts
export class ValidationError extends Error {
  constructor(message: string, public issues?: string[]) {
    super(message);
    this.name = "ValidationError";
  }
}
