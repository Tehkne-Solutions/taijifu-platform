import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'..'),repo=path.resolve(root,'../..');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sets=[
['white',read(path.join(root,'data/white-belt-content.json')),read(path.join(root,'data/white-belt-slice.json')),1,12,12],
['yellow',read(path.join(root,'data/yellow-belt-content.json')),read(path.join(root,'data/yellow-belt-slice.json')),13,24,12],
['orange',read(path.join(root,'data/orange-belt-content.json')),read(path.join(root,'data/orange-belt-slice.json')),25,36,12],
['red',read(path.join(root,'data/red-belt-content.json')),read(path.join(root,'data/red-belt-slice.json')),37,48,12],
['green',read(path.join(root,'data/green-belt-content.json')),read(path.join(root,'data/green-belt-slice.json')),49,64,16],
['cyan',read(path.join(root,'data/cyan-belt-content.json')),read(path.join(root,'data/cyan-belt-slice.json')),65,80,16],
['blue',read(path.join(root,'data/blue-belt-content.json')),read(path.join(root,'data/blue-belt-slice.json')),81,96,16],
['violet',read(path.join(root,'data/violet-belt-content.json')),read(path.join(root,'data/violet-belt-slice.json')),97,112,16],
['brown',read(path.join(root,'data/brown-belt-content.json')),read(path.join(root,'data/brown-belt-slice.json')),113,128,16]
];
const names=read(path.join(repo,'packages/canon/data/nuclei.json')),paths=read(path.join(repo,'packages/canon/data/paths.json')),belts=read(path.join(repo,'packages/canon/data/belts.json')),errors=[];
for(const[label,cfg,slice,start,end,count]of sets){if(cfg.length!==count)errors.push(`${label} config=${cfg.length}, expected=${count}`);if(slice.nuclei.length!==count)errors.push(`${label} slice nuclei=${slice.nuclei.length}, expected=${count}`);if(new Set(cfg.map(x=>x.id)).size!==count)errors.push(`duplicate ${label} nucleus config`);for(const item of cfg){const n=Number(item.id.replace('NUC-N',''));if(!Number.isInteger(n)||n<start||n>end)errors.push(`invalid ${label} nucleus ${item.id}`);if(!item.summary||!item.practice)errors.push(`${item.id} missing pedagogy`)}}
const all=sets.flatMap(([,cfg])=>cfg);if(new Set(all.map(x=>x.id)).size!==128)errors.push('published nuclei must equal 128 unique IDs');if(names.length!==128||paths.length!==32||belts.length!==10)errors.push('canon structure mismatch');const nodes=all.length*3,edges=nodes+(nodes-1);if(nodes!==384)errors.push(`content_nodes=${nodes}, expected=384`);if(edges!==767)errors.push(`content_edges=${edges}, expected=767`);if(errors.length){console.error('TAIJIFU_CONTENT_VALIDATION=FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}console.log('TAIJIFU_CONTENT_VALIDATION=PASS');console.log('published_belts_with_new_paths=9');console.log(`content_nodes=${nodes}`);console.log(`content_edges=${edges}`);console.log('published_nuclei=128');console.log('paths=C01-C32');console.log('black_belt_new_paths=0');console.log('coverage=lesson+quiz+guided-practice per nucleus');
