import { db } from "./index";

export interface PracticeStateRow {
  userId: string;
  beltId: string;
  schemaVersion: number;
  state: Record<string, unknown>;
  updatedAt: string;
}

export async function getPracticeState(userId:string,beltId:string):Promise<PracticeStateRow|null>{
  const [row]=await db()`SELECT user_id,belt_id,schema_version,state,updated_at::text FROM practice_states WHERE user_id=${userId} AND belt_id=${beltId} LIMIT 1`;
  if(!row)return null;
  return{userId:row.user_id,beltId:row.belt_id,schemaVersion:row.schema_version,state:row.state,updatedAt:row.updated_at};
}

export async function upsertPracticeState(input:{userId:string;beltId:string;schemaVersion:number;state:Record<string,unknown>}):Promise<PracticeStateRow>{
  const sql=db();
  const [row]=await sql`INSERT INTO practice_states (user_id,belt_id,schema_version,state) VALUES (${input.userId},${input.beltId},${input.schemaVersion},${sql.json(input.state as any)}) ON CONFLICT (user_id,belt_id) DO UPDATE SET schema_version=EXCLUDED.schema_version,state=EXCLUDED.state,updated_at=now() RETURNING user_id,belt_id,schema_version,state,updated_at::text`;
  return{userId:row.user_id,beltId:row.belt_id,schemaVersion:row.schema_version,state:row.state,updatedAt:row.updated_at};
}
