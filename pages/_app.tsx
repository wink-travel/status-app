import '@mantine/core/styles.css'
import type { AppProps } from 'next/app'
import { createTheme, MantineProvider } from '@mantine/core'
import NoSsr from '@/components/NoSsr'
import '@/util/i18n'

// Wink brand purple (#8039D7, sampled from the brand favicon), expanded into the
// 10-shade ramp Mantine expects for a custom theme color.
const theme = createTheme({
  primaryColor: 'wink',
  colors: {
    wink: [
      '#F7F4FB',
      '#E9DEF7',
      '#D3BAF2',
      '#B88EEB',
      '#A26DE3',
      '#9051DB',
      '#7F38D6',
      '#6E2AC0',
      '#5D26A1',
      '#4D2183',
    ],
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </NoSsr>
  )
}
