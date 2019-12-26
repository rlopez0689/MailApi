# MailApi

_NodeJS Express for making a request to send mail via AWS SES._

- Receives a g-recaptcha-response in the request body for validating the captcha.

#### Some environment variables need to be defined:

- MAIL_KEY -> AWS key
- MAIL_SECRET -> AWS secret
- CAPTCHA_SECRET_KEY -> The secret key provided by google captcha
- TEMPLATE_ID -> The template name registered on SES.
- MAIL_ACCOUNT -> The mail account that will send and receive the mail.

### Instalación 🔧

_Node -> Defined in package.json_

## Deployment 📦

_This proyect has a now.json for making a deploy into zeit.com_

```
now -e MAIL_KEY=<AWS_KEY> -e MAIL_SECRET=<AWS_SECRET> -e CAPTCHA_SECRET_KEY=<CAPTCHA_SECRET_KEY> -e MAIL_ACCOUNT=<MAIL_ACCOUNT> --prod
```
