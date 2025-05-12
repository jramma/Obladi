import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Ob-La-Di",
  description: "Lee nuestros términos y condiciones de uso de la plataforma.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:text-left flex flex-col md:items-start items-center">
      <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>

      <p className="mb-4 text-lg">
        Bienvenido/a a Ob-La-Di. Al acceder o utilizar nuestra plataforma,
        aceptas cumplir estos Términos y Condiciones. Si no estás de acuerdo,
        por favor no utilices nuestros servicios.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">1. Uso del servicio</h2>
      <p className="mb-4">
        Nuestra plataforma está diseñada para ayudar a personas a encontrar o
        reportar objetos perdidos. No está permitido hacer uso malintencionado
        del sistema ni publicar contenido falso.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">2. Responsabilidad</h2>
      <p className="mb-4">
        No nos hacemos responsables por los objetos publicados ni por las
        transacciones entre usuarios. Actúa con sentido común y verifica siempre
        la autenticidad de los reportes.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">3. Privacidad</h2>
      <p className="mb-4">
        Recogemos y almacenamos datos mínimos necesarios para operar
        correctamente el servicio. Puedes consultar nuestra Política de
        Privacidad para más detalles.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">4. Cambios</h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos términos en cualquier
        momento. Cualquier cambio importante será notificado a través de la
        plataforma.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">5. Contacto</h2>
      <p className="mb-4">
        Si tienes preguntas sobre estos términos, puedes escribirnos a{" "}
        <a
          href="mailto:jrammas@uoc.edu"
          className="font-bold dark:text-primary underline "
        >
          jrammas@uoc.edu
        </a>
        .
      </p>

      <p className="mt-12 text-sm text-gray-500">
        Última actualización: abril 2025
      </p>
    </div>
  );
}
