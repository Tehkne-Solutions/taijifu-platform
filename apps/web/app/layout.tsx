import "./globals.css";
export const metadata = { title: "Taijifu — Canon Oficial", description: "Arte marcial integrada, adaptativa e evolutiva." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><div className="shell"><header className="topbar"><a className="brand" href="/"><span className="brand-mark">太</span><span>TAIJIFU</span></a><nav className="nav"><a href="/canon">Canon</a><a href="/canon#bases">Bases</a><a href="/canon#faixas">Faixas</a><a href="/canon#caminhos">Caminhos</a></nav></header>{children}<footer className="footer"><span>TAIJIFU-CANON-1.0</span><strong>Tehkné Solutions</strong></footer></div></body></html>;
}
