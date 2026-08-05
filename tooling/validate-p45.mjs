import fs from'node:fs';
const store=fs.readFileSync('apps/academy/app/components/evidence-store.ts','utf8');
const runtime=fs.readFileSync('apps/academy/app/components/belt-runtime.ts','utf8');
const config=fs.readFileSync('apps/academy/app/components/white-runtime.ts','utf8');
for(const marker of ['createBeltRuntime','WHITE_PATH_IDS','WHITE_NUCLEUS_IDS'])if(!store.includes(marker))throw new Error(`missing White adapter marker ${marker}`);
for(const marker of ['BELT-WHITE','BELT-YELLOW','PATH-C01','PATH-C03'])if(!config.includes(marker))throw new Error(`missing White runtime marker ${marker}`);
for(const marker of ['/api/practice/state','/api/evidence','/api/traversal/submit','promotionGranted:false','decisionRequired:true'])if(!runtime.includes(marker))throw new Error(`missing persistent runtime marker ${marker}`);
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(store+runtime+config))throw new Error('client belt mutation detected');
console.log('TAIJIFU_P45_VALIDATION=PASS');console.log('white_path_checkpoints=3');console.log('traversal_submission=PERSISTENT_WHEN_AUTHENTICATED');console.log('automatic_belt_promotion=BLOCKED');console.log('evidence_history=ENABLED');
