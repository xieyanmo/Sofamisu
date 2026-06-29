export function Login() {
  return (
    <main className="min-h-[calc(100vh-183px)] bg-[#F7F4EF] px-6 py-20 text-[#3A1C0F] lg:px-20">
      <section className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.28em] text-[#005A4F] uppercase">
            Customer account
          </p>
          <h1 className="mt-6 max-w-2xl font-['Neue_Haas_Grotesk','Inter',sans-serif] text-5xl leading-tight font-light text-[#944E25]">
            Sign in to your Sofamisu account
          </h1>
          <p className="mt-6 max-w-xl font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base leading-8 font-light text-[#744026]">
            Review orders, manage saved addresses, and keep your made-to-order
            sofa details close at hand.
          </p>
        </div>

        <form className="border border-[#BE8B48]/35 bg-[#EAE4DB] p-8 shadow-[0_24px_60px_rgba(58,28,15,0.10)]">
          {/* Shopify Customer Account API authentication will be connected here later. */}
          <div className="space-y-6">
            <label className="block font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#744026] uppercase">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="mt-3 block w-full border border-[#BE8B48]/45 bg-[#F7F4EF] px-5 py-4 text-base tracking-normal text-[#3A1C0F] outline-none transition-colors duration-200 focus:border-[#944E25]"
              />
            </label>

            <label className="block font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#744026] uppercase">
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="mt-3 block w-full border border-[#BE8B48]/45 bg-[#F7F4EF] px-5 py-4 text-base tracking-normal text-[#3A1C0F] outline-none transition-colors duration-200 focus:border-[#944E25]"
              />
            </label>
          </div>

          <button
            type="button"
            className="mt-8 w-full bg-[#944E25] px-6 py-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            Sign in
          </button>

          <a
            href="/account?preview=1"
            className="mx-auto mt-4 flex w-fit border border-[#BE8B48]/70 px-4 py-2 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.14em] text-[#944E25] transition-colors duration-200 hover:border-[#944E25] hover:bg-[#F7F4EF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            Preview account page
          </a>

          <div className="mt-6 flex flex-col gap-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#744026] sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/login#create-account"
              className="underline decoration-[#BE8B48]/70 underline-offset-4 transition-colors duration-200 hover:text-[#944E25] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
            >
              Create account
            </a>
            <a
              href="/login#forgot-password"
              className="underline decoration-[#BE8B48]/70 underline-offset-4 transition-colors duration-200 hover:text-[#944E25] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
            >
              Forgot password
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}
