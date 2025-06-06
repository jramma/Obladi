import Avatar from "../ui/Client-avatar";
import SwiperReviews from "../Swipers";
import { Icons } from "@/components/Icons";
export default function Reviews() {
  // Generamos 27 avatares con semillas aleatorias
  const avatars = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    seed: `user-${Math.random().toString(36).substring(2, 15)}`, // Generando una semilla aleatoria
  }));

  return (
    <section
      id="reclaim"
      className="py-20 flex relative flex-col items-center overflow-hidden w-full"
    >
      <Icons.topography className="absolute top-0 opacity-30 scale-150 text-secondary" />

      <div className="container text-start flex items-start">
        <h3 className="text-5xl font-semibold z-10">
          Forma parte de <br /> la comunidad
        </h3>
        <div className="flex flex-wrap gap-6 items-center justify-center py-20 max-w-[900px] self-center">
          {avatars.slice(0, 12).map((avatar) => (
            <div key={avatar.id} className="flex justify-center items-center">
              <Avatar seed={avatar.seed} />
            </div>
          ))}
          {avatars.slice(13, 24).map((avatar) => (
            <div key={avatar.id} className="flex justify-center items-center ">
              <Avatar seed={avatar.seed} />
            </div>
          ))}
        </div>
        <div className="w-full grid md:grid-cols-4 grid-cols-1">
          <div className="flex flex-col text-center items-center p-6 col-span-1 gap-10">
            <p className="text-4xl">
              Contacta al mail de <br/> Ob-La-Di
            </p>

            <a
              href="mailto:jrammas@uoc.edu"
              className="card-style no-underline-effect text-2xl font-bold px-6 py-3 "
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
