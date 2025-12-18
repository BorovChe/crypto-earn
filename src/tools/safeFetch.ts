export const safeFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T | null> => {
  try {
    const res = await fetch(url, { ...options, next: { revalidate: 180 } });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`Network or parsing error for URL: ${url}`, err);
    return null;
  }
};
