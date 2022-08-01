A Web app project that uses Sveriges Radio open API to find available podcasts.
<br />
<br />
<br />
Notes:<br />
Made using React.js <br />
The API responds with XML and is converted using the xml2js package.<br />
API can response with json - ?format=json.  Sticking with the parser though.<br />
<br />
In order to not make an API call that fetches back 200+ programs per channel, I am going to make a API call for the categories and then when you select a category it will then make the api call for that selected category from the channel you want.<br />
Pagination will need to be used, as to not frontload all the loading an make it a bit faster. <br />
P4 local channels might just have to link to their respective website pages.
