module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    () =>
      'npx ts-unused-exports ./tsconfig.json --excludePathsFromReport=app;tailwind.config.ts;contentlayer; --exitWithCount',
  ],
  '**/*.ts?(x)': () => 'tsc --noEmit --pretty',
  '*.json': ['prettier --write'],
};
