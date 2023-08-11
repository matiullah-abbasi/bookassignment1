import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { bookTable, db } from "@/app/lib/drizzle";

async function GET(request: NextRequest)
 {
       const id = request.headers.get("id");
       console.log("the value of id is",id)
  try {

     if(id==null)
     {
      const res = await db.select().from(bookTable)
      console.log(res) 
      return NextResponse.json({ data: res })
    }
    else if(id !== null) 
    {
      const idNumber = parseInt(id, 10); 
      const res = await db.select().from(bookTable).where(eq(bookTable.id, idNumber));
      console.log(res);
      return NextResponse.json({ data: res });
    }
     
  } 
  catch (error)
   {
    console.log((error as { message: string }).message);
    return NextResponse.json({ message: "something went wrong" });
  }
}

export { GET };

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("post api is called", req);

  try {
    if (req.id) {
      const res = await db
        .insert(bookTable)

        .values({ name: req.name, type: req.type, available: req.available })
        .returning();
      return NextResponse.json({
        message: "data added successfully",
        data: res,
      });
    } else {
      throw new Error("task does not exist");
    }
  } catch (error) {
    console.log(error as { message: string });
    return NextResponse.json({ message: "something went wrong in post api" });
  }
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();
  const bookId = req.id;
  console.log(bookId);

  try {
    const deleted = await db.delete(bookTable).where(eq(bookTable.id, bookId));
    console.log("deletd data", deleted);

    if (deleted.rowCount) {
      console.log({ bookTable });
      return NextResponse.json({ message: "Book deleted successfully" });
    } else {
      console.log({ bookTable });
      throw new Error("Book not found");
    }
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({ message: "Error deleting book" });
  }
}
