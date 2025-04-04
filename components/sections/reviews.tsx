import Avatar from "../ui/client-avatar";
import SwiperReviews from "../swipers";

export default function Reviews() {
  // Generamos 27 avatares con semillas aleatorias
  const avatars = Array.from({ length: 26 }, (_, index) => ({
    id: index + 1,
    seed: `user-${Math.random().toString(36).substring(2, 15)}`, // Generando una semilla aleatoria
  }));

  return (
    <section className="py-20 flex flex-col items-center">
      <div className="container text-start flex items-start">
        <h3 className="text-5xl font-light">
          Forma parte de <br /> la comunidad
        </h3>
        <div className="flex flex-wrap gap-6 items-center justify-center py-20 max-w-[900px] self-center">
          {avatars.map((avatar) => (
            <div key={avatar.id} className="flex justify-center items-center">
              <Avatar seed={avatar.seed} />
            </div>
          ))}
        </div>
        <div className="w-full grid md:grid-cols-4 grid-cols-1">
          <div className="flex flex-col text-center items-center p-6 col-span-1 gap-10">
            <p className="text-4xl">Contacta al mail de, <br/> Ob-La-Di</p>

            <a
              href="mailto:jrammas@uoc.edu"
              className="card-style no-underline-effect text-2xl font-bold px-6 py-3 bg-tertiary text-black"
            >
              Contactar
            </a>
          </div>
          <div className="flex col-span-1 md:col-span-3 flex-grow">
            <SwiperReviews />
          </div>
        </div>
      </div>
    </section>
  );
}
