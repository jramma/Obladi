import LostForm from "@/components/form/LostForm";

export default function Reclaim() {
  return (
    <LostForm
      title="Reclamar objeto perdido"
      submitEndpoint="/api/objects/reclaim"
      submitButtonText="Reclamar"
      formBackgroundClass="bg-tertiary"
      dateFieldName="foundAt"
      dateLabel="Fecha en la que lo encontraste"
      buttonClass="bg-primary text-black"
    />
  );
}
