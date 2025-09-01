# Parking-Garage-FE-BE

# Overview

This is a simple full-stack application that allows employees to reserve the single parking space available on a given date.

The project is split into two independent packages:

Backend (Express API)

Frontend (React + Vite + Tailwind)

Both need to be run separately.

# Requirements

Node 23.11

# Running Projects Locally

### Back-End (RUN FIRST)

CLI commands in order:

npm install

npm run build

npm run start

Access the api via http://localhost:3001

### Front-End

CLI commands in order:

npm install

npm run dev

Navigate to http://localhost:5173/ on your browser

# Backend API Endpoints

GET /api/employees
Returns list of all employees

GET /api/bookings
Returns all bookings with employee names

GET /api/bookings/upcoming
Returns upcoming bookings (next 30 days)

GET /api/bookings/check/:date
Check if a specific date is available
Parameters: date (YYYY-MM-DD format)
Response: { available: boolean, bookedBy?: string }

POST /api/bookings
Create a new booking
Body: { employeeId: number, date: string, notes?: string }
Response: Created booking object

DELETE /api/bookings/:id
Cancel a booking
Parameters: id (booking ID)

# Project Comments

## Front-End

The front-end is a standard stack consisting of react + vite + tailwind. External library usage was keep to a minimum to reduce transicient dependancies and maintain lightness. 

Responsiveness was heavily considered and as such functions on a variety of screen sizes. With more time a fully thoughtout mobile design would have been implemented, including the addition of other (a11y) accesibility considerations. 

Prop drilling has been used instead of state manager (e.g. Redux, tanstack) to maintain simplicity and it would be considered over-engineering for such a simple use-case.

To focus on a seperation of concerns within the project a type-based(layered) structure has been followed, with the components following a feature-based structure. Given the small nature of the application I thought this approach kept a balance between readability and complexity by keeping each component feature/domain focused.

Api calls have been kept in a "services" directory and seperated into the relavant domain based backend endpoints used of booking and employee. Similarly, the model interfacts have been placed in their own seperate models dictory and files.

### known bugs/issues

The native calender used clips unless you use p-6, or use a smaller screen size. Would be fixed by using p-6 or prebuilt component from something like daisy-ui.

Initial load time is VERY slow, in large part due to the lucid icon library (~1mb). Easy to fix if using the individual svgs, or make them yourself.

No env used for simplicity. Obvious code smell, but given the simple nature of the project not the biggest issue.

No tests are bad but easy to implement some basic unit tests (Jest), end-to-end tests (playwright), or individual component tests( i.e. React Testing Library).

No global css vars. There are quite a number of places were global css variables and general styling would be defined. Alot of magic numbers used, but atleast they are consistent with tailwind and the simple nature of the app means its easy to catch styling issues and correct them.

The default vite logo is the flavicon.

Alerts are used, and it would be better to have a toast or banner appear somewhere to show the alert in a nicer manner.

All endpoints have not been engineered to fail gracefully, which means if the api is down then the app just doesnt work.

## Back-End

Express was the library of choice for the backend given that I am comfortable with it, and because Quanitiful use it with their backend systems.

MVC or a service-oriented backend structure was used for the structure of this project. For example: interaction with the booking data(CRUD operations) is handled inside the bookingModel, the calls to models and their services is done inside the bookingController. There isnt any view or presentation layer since this is an API that doesnt return HTML. There isnt any service layer or any complex business logic, however the middleware can be see as the service layer as it processes any inputs to the endpoints before passing the request into the controllers. 

An in-memory array is the "database" for the backend, with abit more a time SQLite would have been used as the in-memory database of choice. Naturally this could be extracted further into a stand-alone database given even more time. Given the in-memory nature, the booking dissapear when the API is restarted. With SQLite the "db" could be stored in an s3 bucket to maintain state while still being in-memory.

Basic input validation has been include for the input dates, employee id's, and note length limit.

CORS security has been implemented due to how easy it was to implement but it should be noted that due to the simple nature of the application (and lack of other validation), that it is an unneeded feature. 

### known bugs/issues

There is no way to add/remove users. Can be done manually by admins but can be quite time-consuming once you scale to a larger user-base.

No authentification/authorisation due to time constraints.
No cross-site protecting for the notes input area. Simple cleansing of the input would fix this.

Not really an issue but something to note, but I've written this using no classes and used interfaces instead.

Hot loading isnt enabled, so developing for this can be quite clunky. Using vite would fix this, and would easy (given time) to implement.

Logging in general.

# Cool features to add in the future

Send confirmation emails for bookings

Connect with calendar systems (Outlook, Google Calendar)

Allow weekly/monthly recurring reservations

Usage statistics and reporting

React Native version for mobile users

Dockerize and setup a full CI/CD pipeline
