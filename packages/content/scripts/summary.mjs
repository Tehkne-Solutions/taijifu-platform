import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,'data',n),'utf8'));
const total=read('white-belt-content.json').length+read('yellow-belt-content.json').length;
console.log(`content_nodes=${total*3}`);console.log(`content_edges=${total*3+(total*3-1)}`);console.log(`lessons=${total} quizzes=${total} guided_practices=${total}`);console.log('published_belts=2');
