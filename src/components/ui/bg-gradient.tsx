export default function BGGradient() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full absolute inset-0">
      <div className="md:w-[40%] h-[40%] md:h-auto bg-gradient-to-b md:bg-gradient-to-r from-gray-400 to-gray-200 dark:from-neutral-950 dark:to-neutral-700 " />
      <div className="md:w-[60%] h-[60%] md:h-auto bg-gradient-to-b md:bg-gradient-to-r from-gray-200 to-gray-400 dark:from-neutral-700 dark:to-neutral-950" />
    </div>
  );
}
