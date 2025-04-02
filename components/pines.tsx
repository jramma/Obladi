
import { Icons } from "@/components/icons";
import Avatar from "@/components/ui/avatar";

export default function Pines({ user }: any) {
    const avatars = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        seed: `user-${Math.random().toString(36).substring(2, 15)}`, // Generando una semilla aleatoria
      }));
  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-4xl font-light mb-4">Tus PINES</h1>
        <div className="bg-primary card-style p-6 flex gap-6 items-center group hover:shadow-primary hover:text-primary hover:bg-white dark:hover:bg-black">
          <p className="text-9xl font-bold font-serif px-6">
            {user.pines.length || 0}
          </p>
          <Icons.pines
            className="w-42 h-42 p-4 text-primary-content animate-spin "
            style={{ animationDuration: "20s" }}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-4xl font-light mb-4">Tu gente</h1>
        <div className="bg-secondary flex-grow card-style p-6 flex gap-2 w-full items-start group hover:shadow-secondary hover:text-secondary hover:bg-white dark:hover:bg-black">
        {avatars.map((avatar) => (
            <div key={avatar.id} className="flex justify-center items-center">
              <Avatar seed={avatar.seed} />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
