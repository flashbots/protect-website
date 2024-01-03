This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install packages:

```bash
pnpm install
```

Prepare git hooks:

```bash
pnpm run prepare
```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Built on

This was built using [Next.js](https://nextjs.org/) and:

- [`@next/font`](https://nextjs.org/docs/basic-features/font-optimization) to optimise delivery of font files.

- a [`husky`](https://typicode.github.io/husky/#/) pre-commit hook to lint (eslint) and check unused imports (eslint-plugin-unused-imports)

- [`tailwindcss`](https://tailwindcss.com/) to apply formatting using standard class names


## Embedding the Protect Button in Flashbots docs

Here is example code to embed a button with a link to this app from `https://github.com/flashbots/flashbots-docs`. 

Replace the code in `src/components/ProtectButtonSelector/index.tsx` with the below:

```
import { useEffect, useState } from 'react';

export default function ProtectButtonSelector() {

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const htmlElement = document.documentElement;
    const handleThemeChange = () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      setTheme(currentTheme || 'light');
    };
    handleThemeChange();
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
  }, [])

  return <iframe
    title='Protect Button'
    id="protect-button"
    // replace with correct host
    src={`https://flashbots-protect-72l.vercel.app/button?theme=${theme}`}
    height="88" width="336"
    className="flex dark:dark border-none rounded-lg hover:outline"
  />
}
```