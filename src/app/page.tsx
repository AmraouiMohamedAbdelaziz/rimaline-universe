export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold text-center">
        Rimaline – Univers d&apos;apprentissage pour ton enfant ✨
      </h1>
      <p className="text-center max-w-xl">
        Connecter les enfants à la culture, la langue et les régions
        d&apos;Algérie à travers un univers ludique de stations, de maisons et
        de planètes.
      </p>
      <div className="flex gap-4 mt-4">
        <a
          href="/parent/register"
          className="px-4 py-2 rounded-md border border-gray-300"
        >
          Créer un compte parent
        </a>
        <a
          href="/parent/login"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          Se connecter
        </a>
      </div>
    </main>
  );
}
