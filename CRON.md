# Snippit - Vercel Cron Jobs Setup

This project uses Vercel Cron Jobs to run scheduled tasks.

## Cron Jobs

### Health Check Cron
- **Path**: `/api/cron/health-check`
- **Schedule**: Every Monday and Friday at 9:00 AM UTC
- **Cron Expression**: `0 9 * * 1,5`
- **Purpose**: Automated health check that logs server status to Supabase

## Schedule Format

Vercel uses standard cron expressions:
```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0 and 7 are Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

## Current Schedule
- `0 9 * * 1,5` = Every Monday (1) and Friday (5) at 9:00 AM UTC

## Security

Cron endpoints are protected by the `CRON_SECRET` environment variable. Make sure to:

1. Add `CRON_SECRET` to your Vercel environment variables
2. Generate a secure random string (e.g., using `openssl rand -base64 32`)
3. The cron job sends this as an Authorization header

## Testing Locally

To test the cron job locally:

```bash
# Without authentication (development mode)
curl http://localhost:3000/api/cron/health-check

# With authentication (production simulation)
curl http://localhost:3000/api/cron/health-check \
  -H "Authorization: Bearer your-cron-secret"
```

## Deployment

When deploying to Vercel:

1. The `vercel.json` file automatically configures the cron job
2. Add `CRON_SECRET` to your Vercel project's environment variables
3. Vercel will automatically trigger the job according to the schedule
4. View logs in the Vercel dashboard under "Deployments" → "Functions"

## Monitoring

All cron job executions are logged to the `request_logs` table in Supabase with:
- Timestamp
- Server info (Node version, platform, memory usage, uptime)
- Response status and time
- Full request details

## Modifying the Schedule

To change the cron schedule, edit `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/health-check",
      "schedule": "0 9 * * 1,5"  // Modify this cron expression
    }
  ]
}
```

Common schedules:
- Every day at 9 AM: `0 9 * * *`
- Every hour: `0 * * * *`
- Every Monday at 8 AM: `0 8 * * 1`
- First day of month at midnight: `0 0 1 * *`
