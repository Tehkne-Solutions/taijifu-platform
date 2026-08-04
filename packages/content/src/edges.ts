import nodes from "./nodes";
const edges:any[]=[];
for(const node of nodes){const relation=node.type==="lesson"?"teaches":node.type==="quiz"?"assesses":"practices";edges.push({from:node.id,type:relation,to:node.canonicalEntityId});}
for(let i=0;i<nodes.length-1;i++)edges.push({from:nodes[i].id,type:"next",to:nodes[i+1].id});
export default edges;
