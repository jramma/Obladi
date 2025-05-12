import dynamic from "next/dynamic";
import { Icons } from "@/components/Icons";

const LostForm = dynamic(() => import("@/components/form/LostForm"), {
  ssr: false,
  loading: () => <p className="text-center w-full">Cargando formulario...</p>,
});

export default function Reclaim() {
  return (
    <div id="reclaim" className="w-full flex relative overflow-hidden">
      <Icons.topography className=" absolute top-0 text-tertiary  scale-125  object-cover opacity-20 " />
      <LostForm
        title="Reclamar objeto perdido"
        submitEndpoint="/api/objects/reclaim"
        submitButtonText="Reclamar"
        formBackgroundClass="bg-white dark:bg-gray-800"
        dateFieldName="foundAt"
        dateLabel="Fecha en la que lo encontraste"
        buttonClass="bg-primary text-black"
      />
    </div>
  );
}
