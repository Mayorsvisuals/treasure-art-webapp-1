import Link from "next/link";

export const metadata = {
  title: "Sign Up | Treasure Arts",
  description: "Create your luxury account.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-black py-20 pb-32">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block font-serif text-3xl font-bold tracking-widest text-luxury-gold mb-6"
          >
            TREASURE ARTS
          </Link>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">
            Create Account
          </h1>
          <p className="text-gray-400 font-light">
            Join us to manage commissions, orders, and curations.
          </p>
        </div>

        <div className="bg-luxury-charcoal/30 border border-luxury-charcoal p-8 md:p-12 shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors"
                  placeholder="First"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors"
                  placeholder="Last"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors"
                placeholder="Create a password"
              />
            </div>

            <button
              type="button"
              className="w-full bg-luxury-gold text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors mt-8"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] bg-luxury-charcoal flex-1"></div>
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Or sign up with
            </span>
            <div className="h-[1px] bg-luxury-charcoal flex-1"></div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <button className="w-full border border-luxury-charcoal text-luxury-paper py-3 text-sm hover:bg-luxury-charcoal/50 transition-colors flex items-center justify-center gap-3">
              Google Logo Placeholder
            </button>
            <button className="w-full border border-luxury-charcoal text-luxury-paper py-3 text-sm hover:bg-luxury-charcoal/50 transition-colors flex items-center justify-center gap-3">
              Facebook Logo Placeholder
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400 text-sm font-light">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-luxury-gold hover:text-luxury-paper transition-colors ml-1"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
