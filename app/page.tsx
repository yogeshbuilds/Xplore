import Search from "@/components/Search";

export default function Home() {

  return (
      <main className="relative min-h-screen w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/world.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-800/15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="absolute top-1/20 left-1/20 text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">Xplore</h1>
          <div className="relative w-full max-w-[500px]">
            <Search page="index" />
          </div>
        </div>
        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 text-center">type, click a suggestion or hit Enter</p>
      </main>
  );
}
