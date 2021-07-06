<img src='public/shortBanner.png'/>

# MZ Nails
A site to allow for booking of services offered by a mobile nail salon business.
### Features:
- When a client requests an appointment, a notification is sent to the business owner for review via email.
- When an appointment request is approved, a notification is sent to the client.
- Appointment requests can be reviewed, accepted, modified, and denied from the admin site.
- The location for a given work day, as well as days off, can be set from the admin site.
- The schedule can be viewed by day, or in it's entirety.
- Designed to work on all screen sizes from mobile to desktop

### Built with:
- Next.js
- MongoDB
- MaterialUI

# Preview
<img src='public/Screen Shot 2021-05-20 at 2.20.59 PM.png'/>
<img src='public/Screen Shot 2021-05-20 at 8.15.25 PM.png'/>
<img src='public/Screen Shot 2021-05-31 at 3.56.13 PM.png'/>

# Installation
- From your terminal, `git clone https://github.com/kelortondo/MZNails.git`
- Navigate to the mznails directory
- `npm install`
- `npm run dev`
- Create a file in the main project directory called `next.config.js`. In that file, paste the following:
```
module.exports = {
  env: {
    SENDGRID_API_KEY: <insert your SendGrid API key here. See https://sendgrid.com/docs/ui/account-and-settings/api-keys/>,
    OWNER_EMAIL: <insert the email where you would like to receive appointment request notifications>,
    ADMIN_ID: <insert your admin ID>,
    ADMIN_PW: <insert your admin PW>,
    APPLICATION_SECRET: <random 32 length string>,
    IP_ADDRESS: 'http://localhost:3000'
  }
}
```

# Usage
## Live Site:
<a href="https://mznails.com.ar">https://mznails.com.ar</a><br>
(This site is hosted in Brazil, to be closer to the users of the site in Argentina. Load times may be prolonged) 

## Local instance:
Customer-facing site: localhost:3000/<br>
Admin site: localhost:3000/admin

# Future plans:
- Disable occupied appointment times when the client is attempting to request an appointment
- Generate "add to calendar" link for approved appointments
- Embed Instagram in gallery view
- Create a React Native version
