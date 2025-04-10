import LostForm from "@/components/form/LostForm";

export default function Report() {
  return (
    <LostForm
      title="Reportar objeto perdido"
      submitEndpoint="/api/objects/lost"
      submitButtonText="Reportar"
      formBackgroundClass="bg-primary"
      dateFieldName="lostAt"
      dateLabel="Fecha en la que se perdió"
      buttonClass="bg-tertiary text-black"
    />
  );
}
