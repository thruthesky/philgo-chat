# Firechat

* This chat with firebase will work with PHP.

    1. it sends chat message to PHP.
    2. PHP checks many things like
        * too much talk for DOS.
        * bad words or spam filtering.
        * Saving firebase database.
            * It saves chat data into MariaDB database.
            * and it only saves the last message on Firebase realtime database for realtime update.

## TODO

* authenticiation. login with philgo, google, facebook.
* php filtering.
* blocking.

## Authentication

* It supports
  * PhilGo login
  * Google login
  * Facebook login

## PHP Backend

### Filtering

* too fast talk.
* too much talk. 20 sentence for 1 minutes.
* bad words, spam filtering based on philgo admin page spam filtering.

### Blocking

* Any user can report other users.
  * When the reported user has reported
    * more than 10 other users
    * or 3 users with 5 levels.
    then they will be blocked.

* When a user has blocked
  * it will save a flag on cache, so, even though they change their ID,
  they will still be blocked.