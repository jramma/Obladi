export default function Btns() {
  return (
    <div className="flex gap-10 flex-wrap text-xl">
      <a href="#report" className="no-underline-effect card-style bg-primary py-2 px-6 text-black font-bold">Reporta</a>
      <a href="#reclaim" className="no-underline-effect card-style bg-secondary py-2 px-6  text-black font-bold">
        Reclama
      </a>
      <a href="#find" className="no-underline-effect card-style bg-tertiary py-2 px-6 text-black font-bold">
        Encuentra
      </a>
    </div>
  );
}
