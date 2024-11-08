import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(123);
  return new NextResponse("hello");
}
