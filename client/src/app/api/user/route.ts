export async function GET(res: Response, req: Request) {
  console.log(123);

  return new Response("hello");
}
