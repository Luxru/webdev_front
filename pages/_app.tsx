import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'context/ThemeContext';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}
export default App
