export function causaSlug(titulo: string, id: string): string {
  const titlePart = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${titlePart}-${id}`;
}

// El UUID siempre ocupa los últimos 36 caracteres del slug
export function idFromCausaSlug(slug: string): string {
  return slug.slice(-36);
}
