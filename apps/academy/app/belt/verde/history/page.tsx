import { BeltEvidenceHistory } from "../../../components/belt-runtime-ui";
import { greenConfig } from "../../../components/green-runtime";
export default function GreenHistoryPage(){return <main><section className="belt-hero"><div><span className="eyebrow">Evidence Timeline · Verde</span><h1>Histórico.</h1><p className="lead">Linha do tempo local de aprendizagem e evidência da Faixa Verde. Nenhum evento local altera graduação real.</p></div></section><section className="section"><BeltEvidenceHistory config={greenConfig}/></section></main>;}
