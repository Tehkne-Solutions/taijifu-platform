import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){return <main className="content"><section className="hero"><div><span className="eyebrow">ACADEMY · ACESSO</span><h1>Entrar no Taijifu</h1><p>Autentique-se para sincronizar progresso, evidências, checkpoints e Travessias entre dispositivos.</p></div><SignIn /></section></main>;}
