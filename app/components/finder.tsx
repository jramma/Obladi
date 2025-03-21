import Form from "next/form";

export default function Finder() {
  return (
    <section className="py-20 flex flex-col w-full bg-secondary/30">
      <div className="container flex flex-col gap-10">
        <h2 className="w-full text-5xl font-bold">Encuentra tu objeto perdido</h2>
        <Form action="/search">
          <input name="query" />
          <button type="submit">Submit</button>
        </Form>
      </div>
    </section>
  );
}
