# URLShortener
Here's something that <i>Bitly </i> or <i> Google URL shortener </i> does. Yes, It shortens your ugly long URLs into short and pretty ones. For learning purposes I have tried incorporating authentication with Google. So, precisely you can only shorten if you're an authenticated Google user and sign-in via Google Gateway.

![](/urlshortener.png)



# Code
If you visit http://localhost:8000/api/url the front page renders where you need to sign in via Google. Once signed in, an express session is created for you to browse and shorten URLs. 
I have used npm package-<strong>short id</strong> for generating random string of characters which uniquely identifies the URL you paste in the search bar and save it into the Database.
This entry saved in the DB helps used user to redirect to the original URL being provided by the user.

I was thinking of using the same strings for repeated URLs for optimization purposes. Maybe I roll out that feature in the next version. 

P.S. It doesn't look as attractive as it should, Because the purpose was to learn client and server side interaction using authentication with Google. So, better not judge the book by its cover :smirk:
