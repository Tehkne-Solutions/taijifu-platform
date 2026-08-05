import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("TAIJIFU_DB_PREFLIGHT=FAIL DATABASE_URL_MISSING");
  process.exit(1);
}

const sql = postgres(url, { max: 1, idle_timeout: 5, connect_timeout: 10 });
try {
  const [version] = await sql`select current_database() as database, current_user as user, current_setting('server_version') as version`;
  await sql`select 1 as ok`;
  console.log("TAIJIFU_DB_PREFLIGHT=PASS");
  console.log(`database=${version.database}`);
  console.log(`server_version=${version.version}`);
} catch (error) {
  console.error("TAIJIFU_DB_PREFLIGHT=FAIL CONNECTION_OR_QUERY");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 2 });
}
