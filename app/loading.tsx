"use client";
export default function Loading() {
  return (
    <section className="flex justify-center items-center h-screen bg-white dark:bg-black">
      <div className="flex flex-col items-center justify-center flex-grow gap-4">
        <div className="w-10 h-10 border-4 border-t-transparent border-primary-400 rounded-full animate-spin" />
        <p className="text-primary-400 font-medium">Cargando...</p>
      </div>
    </section>
  );
}
