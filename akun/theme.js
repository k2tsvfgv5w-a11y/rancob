// Theme choice for the account page: null follows the system, else 'light' | 'dark'.
export const parseTheme = (v) => (v === 'dark' || v === 'light' ? v : null);
export const isDark = (mode, systemDark) => mode === 'dark' || (mode === null && !!systemDark);
export const toggled = (mode, systemDark) => (isDark(mode, systemDark) ? 'light' : 'dark');
/** Letter shown in the avatar: the first character of the email, upper case. */
export const initialOf = (email) => {
  const c = String(email ?? '').trim()[0];
  return c ? c.toUpperCase() : '?';
};
