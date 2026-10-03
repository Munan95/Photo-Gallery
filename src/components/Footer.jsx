const contact = [
  { label: 'Street 10B, 302 31 City, Country', href: '#' },
  { label: '+88 12 3456 78', href: 'tel:+0000000000' },
  { label: 'hamilton@photogallery.com', href: 'mailto:hamilton@photogallery.com' },
]

const usefulLinks = ['Delivery', 'Contact', 'Privacy Policy', 'Terms And Conditions']
const socials = ['Instagram', 'Facebook', 'LinkedIn']

const linkClass =
  'underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity'

export default function Footer() {
  return (
    <footer className="bg-white text-black dark:bg-black dark:text-white">
      {/* Top section */}
      <div className="mx-auto grid w-full max-w-[1700px] grid-cols-1 gap-x-4 gap-y-8 px-6 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.1fr_1fr_1fr_1fr] lg:gap-x-3">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1 lg:ml-6">
          <h2 className="flex items-center text-4xl font-extrabold uppercase tracking-wider">
            Phot
            <span className="mx-0.5 inline-block h-7 w-7 rounded-full bg-black dark:bg-white" />
            Gallery
          </h2>
          <p className="mt-5 text-sm">Photo Gallery Company Ltd.</p>
          <p className="mt-4 text-sm">Org nr. 1245678123</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-bold uppercase">Contact</h3>
          <ul className="mt-6 space-y-4 text-sm">
            {contact.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful links */}
        <div>
          <h3 className="text-base font-bold uppercase">Useful Links</h3>
          <ul className="mt-6 space-y-4 text-sm">
            {usefulLinks.map((label) => (
              <li key={label}>
                <a href="#" className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="text-base font-bold uppercase">Follow Us!</h3>
          <ul className="mt-6 space-y-4 text-sm">
            {socials.map((label) => (
              <li key={label}>
                <a href="#" className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Partner / logo slot */}
        <div className="flex pt-6 lg:justify-end">
          <span className="-rotate-2 text-4xl font-black font-nosifer uppercase italic leading-none tracking-tight">
            Art
            <br />
            Gallery
          </span>
        </div>
      </div>

      {/* Maps row */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 pb-12 text-sm">
        <span>Find us on Google Maps:</span>
        <a href="#" className={`${linkClass} font-bold`}>
          📍 PhotoGallery
        </a>
        <a href="#" className={linkClass}>
          📍Showroom
        </a>
      </div>

      {/* Bottom bar */}
      <div className="bg-black px-6 py-5 text-center text-xs text-white dark:bg-white dark:text-black">
        Copyright {new Date().getFullYear()} – All photos on the PhotoGallery are ALL RIGHTS
        RESERVED and are owned by the photographer.
      </div>
    </footer>
  )
}
