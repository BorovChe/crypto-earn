const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getLaunchpoolList() {
  try {
    const res = await fetch(`${baseUrl}/api/launchpools/list`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
