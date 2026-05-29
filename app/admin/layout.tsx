export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-luxury-black text-luxury-paper">
      <aside className="w-64 border-r border-luxury-charcoal p-6 hidden md:block">
        <h2 className="text-luxury-gold font-serif text-xl tracking-widest mb-8">
          ADMIN AREA
        </h2>
        <nav className="space-y-4 text-sm text-gray-400">
          <div className="hover:text-luxury-gold cursor-pointer">Dashboard</div>
          <div className="hover:text-luxury-gold cursor-pointer">Products</div>
          <div className="hover:text-luxury-gold cursor-pointer">Orders</div>
          <div className="hover:text-luxury-gold cursor-pointer">Customers</div>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
