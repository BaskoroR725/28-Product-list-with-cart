import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-rose-50 p-6 md:p-10 lg:p-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Konten Utama: Daftar Produk */}
        <main className="lg:col-span-2">
          <h1 className="mb-8 text-4xl font-bold text-rose-900">Desserts</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Kita akan memasukkan ProductCard di sini nanti */}
          </div>
        </main>

        {/* Section Samping: Keranjang Belanja */}
        <aside>
          <div className="rounded-xl bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-red">Your Cart (0)</h2>
            <div className="flex flex-col items-center py-10">
              <img 
                src="./assets/images/illustration-empty-cart.svg" 
                alt="" 
                aria-hidden="true" 
              />
              <p className="mt-4 text-sm font-semibold text-rose-500">
                Your added items will appear here
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;