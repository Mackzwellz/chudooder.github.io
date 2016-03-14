# chudooder.github.io
Shawn's website fork to implement the parser of existing chatwheels

Changes:
+ commented a lot of code (most of the work went into this than into actual coding)
+ config parser
+ "selections" array now stores actual phrases' gameindexes
+ proper deletion of chatwheel pages (reforms the array and reenumerates the chatwheel pages) 
+- 2-key-layout (as found somewhere on reddit, would like to give credit)

Credits: 
	Valve — DotA 2 and initial phraseList content
	chudooder (github.com/chudooder) — inital chatwheel config builder
	Onekone (github.com/Onekone) — initial help with understanding of the code, suggestions, guidance and motivation (no Kappa)
	stackoverflow.com community for providing thorough answers on googled subjects

TODO:

- insert a new page between existing ones
- sweet insert and delete buttons
- also a copy button for result

- Need to implement 2 global binds:
  bind SEMICOLON +mycw //// ChatWheel Key
  bind ' mycw_next //// NextPage Key (to browse through all chat wheel pages)
How to use: hold the ChatWheel Key and press the NextPage Key to "scroll" through pages
- option (tick) to reset the page to 0 everytime you close the chatwheel

- layout system 
- switch between "key-per-chatwheel" and "2-keys-for all wheels layouts", also "cwpagesnum = keysnumber * keysnumber"
- option for list of chatwheel strings to start from the top, not from the right ((not-so-)purely visual part)

- make keyboard-friendly ( switch to next delete button on delete + make .boxes focus-able by keyboard + turn the wheel accordingly)

- localisation selection

- page style selection (classic dota2 / reborn dota2)
- mb render every wheel as a wheel as in dota menu?
