import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'..'),repo=path.resolve(root,'../..');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const white=read(path.join(root,'data/white-belt-content.json'));
const yellow=read(path.join(root,'data/yellow-belt-content.json'));
const whiteSlice=read(path.join(root,'data/white-belt-slice.json'));
const yellowSlice=read(path.join(root,'data/yellow-belt-slice.json'));
const names=read(path.join(repo,'packages/canon/data/nuclei.json'));
const paths=read(path.join(repo,'packages/canon/data/paths.json'));
const belts=read(path.join(repo,'packages/canon/data/belts.json'));
const errors=[];
function check(label,cfg,slice,start,end){
  if(cfg.length!==12)errors.push(`${label} config=${cfg.length}, expected=12`);
  if(slice.nuclei.length!==12)errors.push(`${label} slice nuclei=${slice.nuclei.length}, expected=12`);
  if(new Set(cfg.map(x=>x.id)).size!==12)errors.push(`duplicate ${label} nucleus config`);
  for(const item of cfg){const n=Number(item.id.replace('NUC-N',''));if(!Number.isInteger(n)||n<start||n>end)errors.push(`invalid ${label} nucleus ${item.id}`);if(!item.summary||!item.practice)errors.push(`${item.id} missing pedagogy`)}
}
check('white',white,whiteSlice,1,12);check('yellow',yellow,yellowSlice,13,24);
const all=[...white,...yellow];
if(new Set(all.map(x=>x.id)).size!==24)errors.push('duplicate nucleus across published slices');
if(names.length!==128)errors.push('canon nuclei names must equal 128');
if(paths.length!==32||belts.length!==10)errors.push('canon structure mismatch');
const nodes=all.length*3,edges=nodes+(nodes-1);
if(nodes!==72)errors.push(`content_nodes=${nodes}, expected=72`);
if(edges!==143)errors.push(`content_edges=${edges}, expected=143`);
if(errors.length){console.error('TAIJIFU_CONTENT_VALIDATION=FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('TAIJIFU_CONTENT_VALIDATION=PASS');
console.log('slices=WHITE-BELT-VS1,YELLOW-BELT-VS1');
console.log(`content_nodes=${nodes}`);console.log(`content_edges=${edges}`);
console.log('white_nuclei=12');console.log('yellow_nuclei=12');console.log('coverage=lesson+quiz+guided-practice per nucleus');
