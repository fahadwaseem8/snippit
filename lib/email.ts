import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null

  private getTransporter() {
    if (!this.transporter) {
      // Configure SMTP transporter
      // For debugging, we'll use environment variables
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    }
    return this.transporter
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      console.log('📤 Attempting to send email:', { to: options.to, subject: options.subject })
      const transporter = this.getTransporter()
      if (!transporter) {
        throw new Error('Failed to create email transporter')
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      }

      console.log('📨 Mail options:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject })
      const info = await transporter.sendMail(mailOptions)
      console.log('✅ Email sent successfully:', info.messageId)
      return true
    } catch (error) {
      console.error('❌ Failed to send email:', error)
      return false
    }
  }

  // Convenience methods for cron notifications
  async sendCronStart(subject: string, details: Record<string, unknown>) {
    const recipient = process.env.CRON_NOTIFICATION_EMAIL
    if (!recipient) {
      console.warn('CRON_NOTIFICATION_EMAIL not set, skipping email notification')
      return false
    }

    const text = `
Cron job started: ${subject}

Details:
${Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('\n')}

Timestamp: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV || 'development'}
    `.trim()

    return this.sendEmail({
      to: recipient,
      subject: `🚀 Cron Started: ${subject}`,
      text,
    })
  }

  async sendCronEnd(subject: string, details: Record<string, unknown>) {
    const recipient = process.env.CRON_NOTIFICATION_EMAIL
    console.log('📧 sendCronEnd called:', { subject, recipient: recipient ? 'SET' : 'NOT SET', detailsKeys: Object.keys(details) })
    
    if (!recipient) {
      console.warn('CRON_NOTIFICATION_EMAIL not set, skipping email notification')
      return false
    }

    const text = `
Cron job completed: ${subject}

Details:
${Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('\n')}

Timestamp: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV || 'development'}
    `.trim()

    return this.sendEmail({
      to: recipient,
      subject: `✅ Cron Completed: ${subject}`,
      text,
    })
  }

  async sendCronError(subject: string, error: Error | string, details?: Record<string, unknown>) {
    const recipient = process.env.CRON_NOTIFICATION_EMAIL
    if (!recipient) {
      console.warn('CRON_NOTIFICATION_EMAIL not set, skipping email notification')
      return false
    }

    const errorMessage = error instanceof Error ? error.message : error
    const errorStack = error instanceof Error ? error.stack : undefined

    const text = `
Cron job failed: ${subject}

Error: ${errorMessage}
${errorStack ? `Stack Trace:\n${errorStack}\n\n` : ''}Details:
${details ? Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('\n') : 'No additional details'}

Timestamp: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV || 'development'}
    `.trim()

    return this.sendEmail({
      to: recipient,
      subject: `❌ Cron Failed: ${subject}`,
      text,
    })
  }
}

// Export singleton instance
export const emailService = new EmailService()