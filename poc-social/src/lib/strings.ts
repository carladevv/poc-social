export function fillVars(s: string, vars: Record<string,string>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
