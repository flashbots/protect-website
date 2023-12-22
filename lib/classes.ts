export const classes = (...names: (string | undefined | boolean)[]) => {
  return names.filter(Boolean).join(' ');
};
