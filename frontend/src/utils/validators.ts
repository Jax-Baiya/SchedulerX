// Example: validators utility
export function isEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}
