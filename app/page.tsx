export default function Home() {
  return (
      <main className="relative min-h-screen w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/world.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h1 className="relative top-1/20 left-1/20 text-white text-3xl sm:text-4xl font-bold">Xplore</h1>
        </div>
      </main>
  );
}
