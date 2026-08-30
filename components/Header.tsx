import { Container, Group, Image, useComputedColorScheme } from '@mantine/core'
import classes from '@/styles/Header.module.css'
import { pageConfig } from '@/uptime.config'
import { PageConfigLink } from '@/types/config'
import { useTranslation } from 'react-i18next'

export default function Header({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation('common')
  const colorScheme = useComputedColorScheme('light')
  const linkToElement = (link: PageConfigLink, i: number) => {
    return (
      <a
        key={i}
        href={link.link}
        target={link.link.startsWith('/') ? undefined : '_blank'}
        className={classes.link}
        data-active={link.highlight}
      >
        {link.label}
      </a>
    )
  }

  const links = [{ label: t('Incidents'), link: '/incidents' }, ...(pageConfig.links || [])]

  // `logoDark` is optional: most logos are transparent and work fine on any background.
  // When a project configures one, swap to it in dark mode instead of layering both
  // images with CSS visibility toggles - Mantine's own styles also set `display` on the
  // image element at the same class specificity, so a CSS-only show/hide race can lose
  // and leave both logos rendered on top of each other.
  const logo = (colorScheme === 'dark' && pageConfig.logoDark) || pageConfig.logo || '/logo.svg'

  return (
    <header className={classes.header} style={style}>
      <Container size="md" className={classes.inner}>
        <div>
          <a
            href={location.pathname == '/' ? 'https://github.com/lyc8503/UptimeFlare' : '/'}
            target={location.pathname == '/' ? '_blank' : undefined}
          >
            <Image src={logo} h={28} w={{ base: 70, sm: 95 }} fit="contain" alt="logo" />
          </a>
        </div>

        <Group gap={5} visibleFrom="sm">
          {links?.map(linkToElement)}
        </Group>

        <Group gap={5} hiddenFrom="sm">
          {links?.filter((link) => link.highlight || link.link.startsWith('/')).map(linkToElement)}
        </Group>
      </Container>
    </header>
  )
}
