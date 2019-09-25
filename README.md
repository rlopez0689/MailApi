# MailApi

_NodeJS Express for making a request to send mail via SendGrid API._
- Receives a g-recaptcha-response in the request body for validating the captcha.
#### Some environment variables need to be defined:
- SENDGRID_API_KEY -> The api key provided by send grid
- CAPTCHA_SECRET_KEY -> The secret key provided by google captcha
- TEMPLATE_ID -> The template id provided by send grid.
- MAIL_ACCOUNT -> The mail account that will send and receive the mail.


### Instalación 🔧

_Node -> Defined in package.json_


## Deployment 📦

_This proyect has a now.json for making a deploy into zeit.com_

```
now -e SENDGRID_API_KEY=<SENDGRID_API_KEY> -e CAPTCHA_SECRET_KEY=<CAPTCHA_SECRET_KEY> -e TEMPLATE_ID=<SEND_GRID_TEMPLATE_ID> -e MAIL_ACCOUNT=<MAIL_ACCOUNT> --prod
```
