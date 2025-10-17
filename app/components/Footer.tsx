export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-2xl">🧷</span>
            <span>Snippit</span>
          </div>
          <p className="text-sm text-foreground/60">
            Your lightweight home for code snippets.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-sm font-semibold">Product</h3>
          <a href="#features" className="text-sm text-foreground/60 hover:text-foreground transition">
            Features
          </a>
          <a href="#demo" className="text-sm text-foreground/60 hover:text-foreground transition">
            Demo
          </a>
          <a href="#pricing" className="text-sm text-foreground/60 hover:text-foreground transition">
            Pricing
          </a>
        </div>

        <div className="grid gap-3">
          <h3 className="text-sm font-semibold">Resources</h3>
          <a href="#docs" className="text-sm text-foreground/60 hover:text-foreground transition">
            Documentation
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition">
            GitHub
          </a>
          <a href="#api" className="text-sm text-foreground/60 hover:text-foreground transition">
            API
          </a>
        </div>

        <div className="grid gap-3">
          <h3 className="text-sm font-semibold">Legal</h3>
          <a href="#privacy" className="text-sm text-foreground/60 hover:text-foreground transition">
            Privacy
          </a>
          <a href="#terms" className="text-sm text-foreground/60 hover:text-foreground transition">
            Terms
          </a>
        </div>
      </div>

      <div className="border-t border-foreground/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>© 2025 Snippit. Built for developers.</p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition">
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition">
              GitHub
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
