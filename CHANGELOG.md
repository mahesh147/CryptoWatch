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
 - Added Google OAuth for login and signup.
 - Added Facebook OAuth for login and signup.
 - Added Github OAuth for login and signup.
 - Added Twitter OAuth for login and signup.

### Security
 - Added an unsubscribeToTimer method to prevent API calls while switching between cryptocurrencies and after logging out.

### Changed
 - [routerLink] has been replaced with a click event to navigate to differnet cryptocurrencies.
 - Merged OAuth-Google branch with Authentications.
 - Merged OAuth-Facebook branch with Authentications.
 - Merged OAuth-Github branch with Authentications.
 - Merged OAuth-Twitter branch with Authenticatios.

## Authentications Branch - 15-02-2018 [Backend]

### Added
 - Added Privacy Policy

### Security
 - Added Auth Guards to all routers to prevent unauthorized access to the service.

## Authentications Branch - 16-02-2018 [Backend]

### Added
 - Assigned a fetchingPrices boolean variable to each cryptocurrency to check if the prices are being fetched.
 - Added name and photoURL inside the bitcoin, ethereum, and ripple component. The values for name and photoURL are fetched using the AuthService.

## Auth_Frontend_2 Branch - Full history of changes [Frontend]

## Inside /app

### Added
 - Customised footer with copyright
 - Removed bootstrap navbar
 - Added two buttons on footer

## Inside /home

### Added
 - Added bootstrap4 card background
 - Made bs4 grids for responsive layout
 - Added jubotron, with background
 - Added material card background on user login/signup request frame

## Inside /login

### Added
 - Made bs4 grids for responsive layout
 - Added bootstrap4 card background
 - Added material card background
 - Added material form design for email and password input
 - Customised social buttons
 - Made some grid fixes
 - Added navbar
 - Implemented input error display change

 ## Inside /signup

 ### Added
 - Added material card background
 - Added material form design for email, name and password input
 - Customised social buttons
 - Made some grid fixes
 - Added navbar
 - Implemented input error display change

## Inside /dashboard

### Added

 - Added bs4 card
 - Added bs4 grids for responsive layout
 - Added angular material card frame
 - Added material buttons
 - Replaced signin button on the navbar with logout button 
 
 ## Inside /Ripple,/Bitcoin,/Ethereum

 ### Added
 - Added material card background
 - Added buttons with material design
 - Added bs4 tables to represent market prices
 - Made bs4 tables responsive to refresh with live prices

## Inside /about

### Added
 - Added bs card background
 - Added material card design

 ## Inside /Privacy Policy

 ### Added
 - Added bs card background
 - Added material card design



