import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    boolean,
  } from "drizzle-orm/pg-core";
  
  import { drizzle } from "drizzle-orm/vercel-postgres";
  import { InferModel } from "drizzle-orm";
  import { sql } from "@vercel/postgres";
  
               export const bookTable = pgTable("booksdata", {
    id: serial("id"),
    name: varchar("name", { length: 255 }),
    type: varchar("type", { length: 255 }),
    available: boolean("available") 
  });
  

  export type Book=InferModel<typeof bookTable>


  export type newBook=InferModel<typeof bookTable,"insert">

  export const db=drizzle(sql)

  