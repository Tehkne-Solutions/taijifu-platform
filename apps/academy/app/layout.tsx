import "./globals.css";

export const metadata = {
  title: "SimpleWay Taijifu",
  description: "LMS oficial do Taijifu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="shell">
          <header className="topbar">
            <a className="brand" href="/">
              <span className="brand-mark">太</span>
              <span>SIMPLEWAY<br/><b>TAIJIFU</b></span>
            </a>
            <nav className="nav">
              <a href="/">Dashboard</a>
              <a href="/belt/branca">Faixa Branca</a>
              <a href="/assistant">Tutor IA</a>
              <span className="nav-badge">P7</span>
            </nav>
          </header>
          {children}
          <footer className="footer">
            <span>Canon 1.0 · SimpleWay Taijifu</span>
            <strong>Tehkné Solutions</strong>
          </footer>
        </div>
      </body>
    </html>
  );
}
