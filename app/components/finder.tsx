import Form from "next/form";

export default function Finder() {
  return (
    <section className="py-20 flex flex-col w-full bg-secondary/30">
      <div className="container flex flex-col gap-10">
        <h2 className="w-full text-5xl font-bold">
          Encuentra tu objeto perdido
        </h2>
        <Form action="/search" className="relative w-full">
          <input
            name="query"
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 backdrop-blur-xl pb-20 outline-none text-lg text-gray-700 placeholder-gray-500 rounded-3xl border-2  border-black"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-full absolute right-6 bottom-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 16l4-4m0 0l-4-4m4 4H3"
              />
            </svg>
          </button>
        </Form>
      </div>
    </section>
  );
}
