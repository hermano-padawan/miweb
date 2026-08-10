const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string) {
  if (!path || /^(?:[a-z]+:|#|\/\/)/i.test(path)) return path;
  if (base && (path === base || path.startsWith(`${base}/`))) return path;

  return `${base}/${path.replace(/^\//, "")}` || "/";
}
