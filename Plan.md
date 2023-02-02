# LocalHost - Book unsafe accomodiations from unverified hosts (and guests) (no https)

## Features / Use-Cases

- [DONE] Registrieren
- [DONE] Login
- [DONE] Logout
- [DONE] Stay Logged in Feature (Refresh token + Cookies)

- [DONE] Forgot Password
- [Thu!!!] Facade/Client-Input-Validation implementieren !!
- [DONE] Edit Profile
- [Wed!!!] Change Password

- [DONE] Show Profile (of any user)
- [DONE] With his accomidations + rating(s)
- [DONE] Offer Accommodations
- View/Search Accommodations w/ Filter for
  - Date-Range
  - Location City
  - Distance to City Center
  - Highlights / Features (Balcony, Room count, Sqm, Breakfast, ...)
  - Rating
  - Price Range
  - hostId
- Book Accommodation/Stay (main payment method: Bar)
  --> reserverd, others can not book in the same time
- Cancel Stay reservation

- Messaging with Hosts
- Rating System (Stars + Comments)

- Save Favorites

## Entities / DB-Model

- Users (can be Guest and/or Host)

  - \_id
  - firstname
  - lastname
  - email
  - profile picture
  - bio
  - password-stuff
  - createdAt
  - ratingsByHosts: [{ ratedAt, stars, message, ratedBy }]

- Stays

  - \_id
  - hostId: <userId>
  - Location: { langitude, latitude, address, zip, country, city }
  - pictures: [filepathStrings]
  - price per Night
  - rating
  - highlights: { rooms, wifi, kitchen, bathroom, airconditioner }
  - reservations: [{ id, startDate, endDate, guestId }]
  - ratings: [{ ratedAt, stars, message, ratedBy }]

- Chats
  - \_id
  - stayId
  - guestId
  - messages: [{ text, postedBy, postedAt }]
