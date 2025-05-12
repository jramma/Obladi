import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Ob-La-Di",
  description:
    "Información sobre cómo protegemos tus datos personales en Ob-La-Di.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:text-left flex flex-col md:items-start items-center">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

      <p className="mb-4 text-lg">
        En Ob-La-Di valoramos tu privacidad y queremos que sepas qué datos
        recogemos y cómo los utilizamos.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        1. Qué datos recogemos
      </h2>
      <p className="mb-4">
        Solo recogemos los datos necesarios para que la plataforma funcione
        correctamente:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Tu dirección de email al registrarte</li>
        <li>Nombre o apodo visible públicamente</li>
        <li>Ubicación de objetos perdidos que subas</li>
        <li>Datos técnicos mínimos como la fecha de creación de la cuenta</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        2. Cómo usamos tus datos
      </h2>
      <p className="mb-4">
        Utilizamos tus datos exclusivamente para ofrecerte el servicio. No los
        compartimos con terceros, no los vendemos ni los usamos para publicidad.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        3. Dónde almacenamos tus datos
      </h2>
      <p className="mb-4">
        Tus datos se almacenan en una base de datos segura en MongoDB Atlas, con
        acceso restringido y protegido.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        4. Eliminación de datos
      </h2>
      <p className="mb-4">
        Puedes solicitarnos la eliminación de tu cuenta y datos personales en
        cualquier momento escribiendo a{" "}
        <a
          href="mailto:jrammas@uoc.edu"
          className="font-bold dark:text-primary  underline"
        >
          jrammas@uoc.edu
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        5. Cambios en esta política
      </h2>
      <p className="mb-4">
        Esta política puede actualizarse si cambiamos el modo en que tratamos
        tus datos. Te avisaremos si ocurre.
      </p>

      <p className="mt-12 text-sm text-gray-500">
        Última actualización: abril 2025
      </p>
    </div>
  );
}
