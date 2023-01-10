import md5 from "md5";

export function getGravatarURL(email: string) {
  const address = String(email).trim().toLowerCase();
  const hash = md5(address);
  return `https://seccdn.libravatar.org/avatar/${hash}?d=identicon`;
}
