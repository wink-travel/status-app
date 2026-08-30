// This is a simplified example config file for quickstart
// Some not frequently used features are omitted/commented out here
// For a full-featured example, please refer to `uptime.config.full.ts`

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: 'Wink Status Page',
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [{ link: 'https://app.wink.travel', label: 'Wink App', highlight: true }],
  // Group your monitors so the status page shows backends and front-ends separately
  group: {
    'Backend APIs': ['api', 'integrations', 'partner', 'iam'],
    'Frontend Apps': ['book', 'app'],
  },
}

const workerConfig: WorkerConfig = {
  // Define all your monitors here
  monitors: [
    {
      id: 'api',
      name: 'API',
      method: 'GET',
      target: 'https://api.wink.travel/actuator/health',
      statusPageLink: 'https://api.wink.travel',
      expectedCodes: [200],
      // Spring Boot Actuator health payload looks like {"status":"UP"}
      responseKeyword: '"status":"UP"',
    },
    {
      id: 'integrations',
      name: 'Integrations',
      method: 'GET',
      target: 'https://integrations.wink.travel/actuator/health',
      statusPageLink: 'https://integrations.wink.travel',
      expectedCodes: [200],
      responseKeyword: '"status":"UP"',
    },
    {
      id: 'partner',
      name: 'Partner',
      method: 'GET',
      target: 'https://partner.wink.travel/actuator/health',
      statusPageLink: 'https://partner.wink.travel',
      expectedCodes: [200],
      responseKeyword: '"status":"UP"',
    },
    {
      // iam.wink.travel's security filter intercepts every path (including /actuator/health)
      // and redirects unauthenticated requests to /login, so the actuator endpoint isn't
      // independently checkable from the outside. Checking the root path is sufficient:
      // it consistently resolves (after following the redirect) to a 200 login page.
      id: 'iam',
      name: 'IAM',
      method: 'GET',
      target: 'https://iam.wink.travel',
      statusPageLink: 'https://iam.wink.travel',
    },
    {
      id: 'book',
      name: 'Book',
      method: 'GET',
      target: 'https://book.wink.travel',
      statusPageLink: 'https://book.wink.travel',
    },
    {
      id: 'app',
      name: 'App',
      method: 'GET',
      target: 'https://app.wink.travel',
      statusPageLink: 'https://app.wink.travel',
    },
  ],
  // [Optional] Notification settings
  // No notification channel configured yet - add a `notification.webhook` block here
  // (see `uptime.config.full.ts` for a fully-documented example) when you're ready to
  // wire up Slack/Discord/Telegram/Apprise alerts.
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
const maintenances: MaintenanceConfig[] = []

// Don't edit this line
export { maintenances, pageConfig, workerConfig }
