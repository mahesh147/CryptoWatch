# Changelog

All noteable changes to this project will be documented in this file.

##  Unreleased
## [This is the history of changes made during the "Core Engineering" process of the web-app.]

## Live-Price Branch - 04-02-2018 [Backend]

### Added
 - Generated a new component for Ripple
 - Genrated a new component for Bitcoin
 - Added component in app.module.ts
 - Added routing feature for the web-app.

## Live-Price Branch - 05-02-2018 [Backend]

### Added
 - Proper code formatting.
 - Generated a new component for Ethereum
 - Added component in app.module.ts
 - Added Ethereum routes to web-app.

## Live-Price Branch - 10-02-2018 [Backend]

### Added
 - Added Remitano live price for Bitcoin
 - Added Remitano live price for Ripple
 - Added EthexIndia live price for Ethereum
 - Added Current Price Aggreate ( in both INR and USD ) for all three cryptocurrency.

### Changed
 - Merged Live-Price branch with master.

### Removed
 - Koniex live price api for Ethereum was removed and replaced with Remitano

## Authentications Branch - 12-02-2018 [Backend]

### Added
 - Added Signup, Login and Dashboard Component.
 - Added Firebase, and AngularFire2 modules to the project.
 - Made a temporary Welcome page in the Home Component with a small introduction and options to login or signup.

### Changed
 - Moved the inital routes for Bitcoin, Ethereum, and Ripple from Home component to Dashboard component

## Email-Password-Authentication Branch - 14-02-2018 [Backend]

### Added
 - Added Email and Password Authentication for both logging in and signing up for an account.
 - Added logout feature from the Dashboard
 - Added default user image for Email-Password auth
 - Added Google OAuth for login and signin.

### Security
 - Added an unsubscribeToTimer method to prevent API calls while switching between cryptocurrencies and after logging out.

### Changed
 - [routerLink] has been replaced with a click event to navigate to differnet cryptocurrencies.
 - Merged OAuth-Google branch with Authentications
