#Home-Assistant to Webpage
With this you can display an Home Assistant variable on an Website. 
This could be useful to for example display variables in OBS with a browser source.

##My usecase
In my example i use it do display the heart rate of my smartwatch.

##Setup
Just go in the get_data.php file and change the three values:
- url: the url of your home assistant instance
- sensor: the name of your sensor in homeassistant that you want to display
- auth: access token for your home assistant. You get this my going to your profile in home assistant and then scrolling to the bottom