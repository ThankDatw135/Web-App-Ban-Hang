import Link from 'next/link';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Clothing', href: '/products?category=clothing' },
    { name: 'Accessories', href: '/products?category=accessories' },
    { name: 'New Arrivals', href: '/products?new=true' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
  account: [
    { name: 'Sign In', href: '/login' },
    { name: 'Register', href: '/register' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Profile', href: '/profile' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-ivory/10">
      <div className="container-luxury py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl text-ivory">
              Luxury<span className="text-muted-gold">.</span>
            </Link>
            <p className="mt-4 text-body-sm text-warm-white/60 max-w-xs">
              Quiet Luxury. Timeless Elegance. Curated collections for the discerning individual.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-sm font-medium text-ivory mb-4 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body-sm text-warm-white/60 hover:text-ivory transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-sm font-medium text-ivory mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body-sm text-warm-white/60 hover:text-ivory transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-sans text-sm font-medium text-ivory mb-4 uppercase tracking-wider">
              Account
            </h4>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body-sm text-warm-white/60 hover:text-ivory transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-warm-white/40">
            © 2026 Luxury Fashion. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-caption text-warm-white/40 hover:text-warm-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-caption text-warm-white/40 hover:text-warm-white/60">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
