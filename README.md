Fractions_Learning
==================

Fractions Learning Web App

3 Main Files:

- index.html 
- FractionsLearning.js
- SequenceHandler.js

=====================
index.html
=====================

index.html is the shell and provides a simple javascript code to generate a form that takes in any value.
The value is passed on to FractionsLearning.js as a parameter in its init function.

=====================
FractionsLearning.js
=====================

function createCountDown -> creates a timer

function getData -> currently it has the data hardcoded but this may be where GET requests will be made
in order to retrieve the data from the serve

function init -> takes in the user_id and sets up canvas and tick function

function startTest -> takes in user_id. Gets data and creates a sequenceHandler object that will handle 
most of the program

function tick -> this function gets called every clock cycle. 


=====================
SequenceHandler.js
=====================

This class displays the screens and handles user events.
First, objects that will be drawn such as the fractions and lines for the nonsymbolic ratios are rendered but made invisible.

Next, depending on where the user is, we check our flags. If instructionflag (instruction) is true, we display the instructions.
After that flag is turned off, we proceed to displaying other events. Just remember that since tick gets called every clock cycle
that means handleSequence() gets called every clock cycle (it is being called in tick). As a consequence, the way to think about
control flow in this program is not linearly but more according to what flags are set. That is, is instruction on? Is feedback on? 
Is sequence on? Etc...

When the sequence is not on... the user gets ent to the end display which then will reloop the user back to the startTest function
in FractionsLearning.js. For more interative and changing datasets, change the code in FractionsLearning.js to make different calls
for different datasets. In addition, displayEndSequence() may be a good place to make a POST request to the server with the user's
response which is stored in this.outPutData.



=========================

Feel free to contact me if you have any questions.
Moving forward, it may be best to contact me at:
divxyng.edu@gmail.com

instead of my wisc email.

