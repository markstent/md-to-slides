export const themes = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'accent', name: 'Accent' },
];

export const defaultThemeId = 'light';

export function resolveTheme(id) {
  return themes.find((theme) => theme.id === id)
    ?? themes.find((theme) => theme.id === defaultThemeId);
}
