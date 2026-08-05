import "./globals.css";
import "./knowledge.css";

export const metadata = {
  title: "Taijifu — Fonte Oficial",
  description: "Fonte oficial de informação, método, currículo e conhecimento do Taijifu."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><div className="shell">
    <header className="topbar">
      <a className="brand" href="/"><span className="brand-mark">太</span><span>TAIJIFU</span></a>
      <nav className="nav" aria-label="Navegação principal">
        <a href="/canon">Canon</a><a href="/metodo">Método</a><a href="/canon#faixas">Faixas</a><a href="/canon#caminhos">Caminhos</a><a href="/glossario">Glossário</a>
      </nav>
    </header>{children}<footer className="footer"><span>TAIJIFU-CANON-1.0 · Fonte Oficial</span><strong>Tehkné Solutions</strong></footer>
  </div></body></html>;
}
