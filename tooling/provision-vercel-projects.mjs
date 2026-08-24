const token = process.env.VERCEL_TOKEN;
const teamId = process.env.VERCEL_TEAM_ID;
const dryRun = process.env.TAIJIFU_VERCEL_APPLY !== "true";

if (!token) throw new Error("VERCEL_TOKEN is required");
//if (!teamId) throw new Error("VERCEL_TEAM_ID is required");

const api = "https://api.vercel.com";
const repo = "Tehkne-Solutions/taijifu-platform";
const projects = [
  { name: "taijifu-site", rootDirectory: "apps/web" },
  { name: "taijifu-academy", rootDirectory: "apps/academy" },
];

async function request(path, init = {}) {
  const response = await fetch(`${api}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = body?.error?.message ?? body?.message ?? `${response.status} ${response.statusText}`;
    throw new Error(`${init.method ?? "GET"} ${path}: ${message}`);
  }
  return body;
}

async function getProject(name) {
  try {
    return await request(`/v9/projects/${encodeURIComponent(name)}?teamId=${encodeURIComponent(teamId)}`);
  } catch (error) {
    if (String(error.message).includes("404") || String(error.message).toLowerCase().includes("not found")) return null;
    throw error;
  }
}

async function createProject(project) {
  const body = {
    name: project.name,
    framework: "nextjs",
    rootDirectory: project.rootDirectory,
    gitRepository: { type: "github", repo },
  };
  return request(`/v11/projects?teamId=${encodeURIComponent(teamId)}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

for (const project of projects) {
  const existing = await getProject(project.name);
  if (existing) {
    if (existing.rootDirectory !== project.rootDirectory) {
      throw new Error(`${project.name} exists with rootDirectory=${existing.rootDirectory ?? "<unset>"}; expected ${project.rootDirectory}`);
    }
    const linkedRepo = existing.link?.repo ?? existing.link?.repoId ?? null;
    console.log(`VERCEL_PROJECT_EXISTS name=${project.name} root=${project.rootDirectory} repo=${linkedRepo ?? "linked/unknown"}`);
    continue;
  }

  if (dryRun) {
    console.log(`VERCEL_PROJECT_WOULD_CREATE name=${project.name} root=${project.rootDirectory} repo=${repo}`);
    continue;
  }

  const created = await createProject(project);
  console.log(`VERCEL_PROJECT_CREATED name=${created.name} id=${created.id} root=${created.rootDirectory}`);
}

console.log(`TAIJIFU_VERCEL_PROVISION=${dryRun ? "DRY_RUN" : "PASS"}`);
