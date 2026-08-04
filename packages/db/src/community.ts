import { db } from "./index";

export type CommunityVisibility="public"|"members"|"private";
export type CommunityGroupType="general"|"study"|"dojo"|"research"|"mentoring";
export type CommunityPostType="reflection"|"question"|"practice"|"research"|"announcement";

export async function upsertCommunityProfile(input:{userId:string;handle:string;bio?:string;visibility?:CommunityVisibility}){
  const [row]=await db()`INSERT INTO community_profiles(user_id,handle,bio,visibility) VALUES(${input.userId},${input.handle},${input.bio??''},${input.visibility??'members'}) ON CONFLICT(user_id) DO UPDATE SET handle=EXCLUDED.handle,bio=EXCLUDED.bio,visibility=EXCLUDED.visibility,updated_at=now() RETURNING user_id,handle,bio,visibility,updated_at::text`;
  return row;
}

export async function getCommunityProfile(userId:string){const [row]=await db()`SELECT p.user_id,p.handle,p.bio,p.visibility,u.display_name,u.current_belt_id FROM community_profiles p JOIN user_profiles u ON u.id=p.user_id WHERE p.user_id=${userId} LIMIT 1`;return row??null;}

export async function createCommunityGroup(input:{id:string;slug:string;name:string;groupType:CommunityGroupType;ownerUserId:string;description?:string}){
  const sql=db();return sql.begin(async tx=>{const [group]=await tx`INSERT INTO community_groups(id,slug,name,group_type,owner_user_id,description) VALUES(${input.id},${input.slug},${input.name},${input.groupType},${input.ownerUserId},${input.description??''}) RETURNING id,slug,name,group_type,description,status`;await tx`INSERT INTO community_group_members(group_id,user_id,role,status) VALUES(${input.id},${input.ownerUserId},'owner','active')`;return group;});
}

export async function joinCommunityGroup(groupId:string,userId:string){await db()`INSERT INTO community_group_members(group_id,user_id,role,status) VALUES(${groupId},${userId},'member','active') ON CONFLICT(group_id,user_id) DO UPDATE SET status='active'`;}
export async function listCommunityGroups(userId:string){return db()`SELECT g.id,g.slug,g.name,g.group_type,g.description,g.status,COALESCE(m.role,'none') member_role,COALESCE(m.status,'none') member_status FROM community_groups g LEFT JOIN community_group_members m ON m.group_id=g.id AND m.user_id=${userId} WHERE g.status='active' ORDER BY g.created_at DESC`;}

export async function createCommunityPost(input:{id:string;authorUserId:string;groupId?:string|null;body:string;canonicalEntityIds?:string[];postType?:CommunityPostType}){
  const sql=db();const [row]=await sql`INSERT INTO community_posts(id,author_user_id,group_id,body,canonical_entity_ids,post_type) VALUES(${input.id},${input.authorUserId},${input.groupId??null},${input.body},${sql.json((input.canonicalEntityIds??[]) as any)},${input.postType??'reflection'}) RETURNING id,author_user_id,group_id,body,canonical_entity_ids,post_type,status,created_at::text`;return row;
}

export async function listCommunityFeed(userId:string,limit=50){return db()`SELECT p.id,p.author_user_id,u.display_name,cp.handle,p.group_id,g.name group_name,p.body,p.canonical_entity_ids,p.post_type,p.created_at::text FROM community_posts p JOIN user_profiles u ON u.id=p.author_user_id LEFT JOIN community_profiles cp ON cp.user_id=p.author_user_id LEFT JOIN community_groups g ON g.id=p.group_id LEFT JOIN community_group_members gm ON gm.group_id=p.group_id AND gm.user_id=${userId} AND gm.status='active' WHERE p.status='published' AND (p.group_id IS NULL OR gm.user_id IS NOT NULL) ORDER BY p.created_at DESC LIMIT ${limit}`;}

export async function createMentoringRequest(input:{id:string;requesterUserId:string;mentorUserId?:string|null;groupId?:string|null;topic:string;message?:string}){if(input.mentorUserId&&input.mentorUserId===input.requesterUserId)throw new Error('self-mentoring-request-forbidden');const [row]=await db()`INSERT INTO mentoring_requests(id,requester_user_id,mentor_user_id,group_id,topic,message) VALUES(${input.id},${input.requesterUserId},${input.mentorUserId??null},${input.groupId??null},${input.topic},${input.message??''}) RETURNING id,requester_user_id,mentor_user_id,group_id,topic,message,status,created_at::text`;return row;}
export async function listMentoringRequests(userId:string){return db()`SELECT id,requester_user_id,mentor_user_id,group_id,topic,message,status,created_at::text,updated_at::text FROM mentoring_requests WHERE requester_user_id=${userId} OR mentor_user_id=${userId} ORDER BY created_at DESC`;}
