import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-luxury-black">
      <div className="text-center">
        <h1 className="text-luxury-paper font-serif text-3xl mb-4">404 - Page Not Found</h1>
        <Link href="/" className="text-luxury-gold uppercase tracking-widest text-xs font-medium hover:text-white transition-colors border-b border-luxury-gold pb-1">
          Return Home
        </Link>
      </div>
    </div>
  );
}
