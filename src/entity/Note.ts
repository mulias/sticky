import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from "typeorm";

export type NoteObj = Pick<Note, "id" | "body" | "createdAt" | "updatedAt">;

export type NoteBuilder = Partial<Note>;

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Warning: don't use `new Note()` diectly, use `newBuilder()` to create a
   * note builder, or use query functions to retrieve already persisted notes.
   */
  constructor() {
    this.id = undefined as any;
    this.body = undefined as any;
    this.createdAt = undefined as any;
    this.updatedAt = undefined as any;
  }

  static newBuilder(): NoteBuilder {
    return new Note();
  }

  toObj(): NoteObj {
    const { id, body, createdAt, updatedAt } = this;
    return { id, body, createdAt, updatedAt };
  }
}
