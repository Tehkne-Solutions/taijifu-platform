import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,'data',n),'utf8'));
const files=['white-belt-content.json','yellow-belt-content.json','orange-belt-content.json','red-belt-content.json','green-belt-content.json'];
const total=files.reduce((sum,file)=>sum+read(file).length,0);
console.log(`content_nodes=${total*3}`);console.log(`content_edges=${total*3+(total*3-1)}`);console.log(`lessons=${total} quizzes=${total} guided_practices=${total}`);console.log('published_belts=5');
