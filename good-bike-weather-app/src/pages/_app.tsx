import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#BC6C25',
    },
  },
})

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <SessionProvider session={session}>
            <Component {...pageProps} />
            <div id="portal" />
          </SessionProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App
