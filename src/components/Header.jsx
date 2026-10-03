const navLinks = ['Home', 'About', 'Contact']

export default function Header({ query, setQuery, dark, setDark }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white dark:border-white dark:bg-black">
      <div className="mx-auto flex w-full max-w-[1700px] flex-wrap items-center gap-x-3 gap-y-3 px-6 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center text-3xl font-extrabold uppercase tracking-wider pr-15">
          Phot
          <span className="mx-0.5 inline-block h-7 w-7 rounded-full bg-black dark:bg-white" />
          Gallery
        </a>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 text-base font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="underline-offset-4 hover:underline"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right side: search, dark mode, join */}
        <div className="ml-auto flex w-full items-center gap-3 sm:w-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search photos"
            className="min-w-0 flex-1 rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-black placeholder-neutral-500 outline-none focus:ring-1 focus:ring-gray-600 sm:w-56 sm:flex-none dark:border-white dark:bg-black dark:text-white dark:focus:ring-white"
          />
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="rounded-full border border-gray-400 px-3 py-2 text-sm hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
          <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-80 dark:bg-white dark:text-black">
            Join
          </button>
        </div>
      </div>
    </header>
  )
}
