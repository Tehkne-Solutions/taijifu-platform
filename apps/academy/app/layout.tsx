import "./globals.css";

export const metadata = {title:"SimpleWay Taijifu",description:"App oficial de estudo e prática do Taijifu."};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><div className="shell"><header className="topbar"><a className="brand" href="/"><span className="brand-mark">太</span><span>SIMPLEWAY<br/><b>TAIJIFU</b></span></a><nav className="nav"><a href="/">Dashboard</a><a href="/belt/branca">Branca</a><a href="/belt/amarela">Amarela</a><a href="/belt/laranja">Laranja</a><a href="/belt/vermelha">Vermelha</a><a href="/belt/verde">Verde</a><a href="/belt/ciano">Ciano</a><a href="/belt/azul">Azul</a><a href="/belt/violeta">Violeta</a><a href="/assistant">Tutor IA</a><span className="nav-badge">APP</span></nav></header>{children}<footer className="footer"><span>Canon 1.0 · App de prática</span><strong>Tehkné Solutions</strong></footer></div></body></html>;
}
