function Divider() {
  return (
    <div className="mx-auto flex w-[90%] items-center gap-4 py-2 md:w-[70%]" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export default Divider;
