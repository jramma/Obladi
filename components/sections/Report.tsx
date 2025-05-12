import dynamic from "next/dynamic";
import { Icons } from "@/components/Icons";

const LostForm = dynamic(() => import("@/components/form/LostForm"), {
  ssr: false,
  loading: () => <p className="text-center w-full">Cargando formulario...</p>,
});

export default function Report() {
  return (
    <div id="report" className="w-full flex relative overflow-hidden">
      <Icons.topography className=" absolute top-0 text-primary  scale-125  object-cover  opacity-20 " />
      <div className="absolute top-8  flex w-full justify-center">
        <div className="container flex ">
          <p className="bg-black rounded-lg dark:border-2 border-white text-primary p-2 self-start">
            +1 pines
          </p>
        </div>
      </div>
      <LostForm
        title="Reportar objeto perdido"
        submitEndpoint="/api/objects/lost"
        submitButtonText="Reportar"
        formBackgroundClass="bg-white dark:bg-gray-800"
        dateFieldName="lostAt"
        dateLabel="Fecha en la que se perdió"
        buttonClass="bg-tertiary text-black"
      />
    </div>
  );
}
