# chudooder.github.io
Shawn's website fork to implement **the parser of existing chatwheels**

Proceed [here, it's the generator page](http://mackzwellz.github.io/chatwheel.html).

Downsides (with the current setup):
+ Whenever you bring the chatwheel up in-game, it brings up the one you stopped on during switching. But when you start switching, it starts from the very beginning; this can be misleading, and idk how to fix it, would like to have some input on this.
+ Basic functionality is there, but a lot more need to be done imo.
***

Changes in this fork:
+ commented a lot of code (most of the work went into this than into actual coding)
+ config parser
+ "selections" array now stores actual phrases' gameindexes
+ proper deletion of chatwheel pages (reforms the array and reenumerates the chatwheel pages) 
+ TBF: implement 2-key-layout (as found somewhere on reddit, would like to give credit)

Credits: 
+ Valve — DotA 2 and initial phraseList content
+ chudooder ([github.com/chudooder](https://github.com/chudooder)) — inital chatwheel config builder
+ Onekone ([github.com/Onekone](https://github.com/Onekone)) — initial help with understanding of the code, suggestions, guidance and motivation (no Kappa)
+ stackoverflow.com community for providing thorough answers on googled subjects
***

TODO:

- [ ] insert a new page between existing ones
- [ ] sweet insert and delete buttons
- [ ] also a copy button for result

- [ ] Need to implement 2 global binds:

>   bind SEMICOLON +mycw //// ChatWheel Key

>   bind ' mycw_next //// NextPage Key (to browse through all chat wheel pages)

>   How to use: hold the ChatWheel Key and press the NextPage Key to "scroll" through pages

- [ ] option (tick) to reset the page to the first one everytime you close the chatwheel (commented out in code)

- [ ] layout system 
- [ ] switch between "key-per-chatwheel" and "2-keys-for all wheels layouts", also "cwpagesnum = keysnumber * keysnumber"
- [ ] option for list of chatwheel strings to start from the top, not from the right ((not-so-)purely visual part)

- [ ] make keyboard-friendly ( switch to next delete button on delete + make .boxes focus-able by keyboard + turn the wheel accordingly)

- [ ] localisation selection

- [ ] page style selection (classic dota2 / reborn dota2)
- [ ] mb render every wheel as a wheel as in dota menu?
