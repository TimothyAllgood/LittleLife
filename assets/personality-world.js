// Little Life: authored dispositions and personality-driven episodes.
// Loaded before game.js, no dependencies, no globals beyond this immutable catalog.
window.LITTLE_LIFE_PERSONALITY = (() => {
  const profiles = [
    // id | warmth, nerve, discipline, curiosity, mischief | distinctive detail | weakness
    ['kind', 2,0,1,0,-2,'keeps spare tissues for other people','has trouble saying no'],
    ['reckless',-1,2,-2,1,2,'once entered a contest without reading the rules','thinks consequences are for future-you'],
    ['curious',1,0,0,2,0,'reads warning signs as invitations to ask questions','cannot leave a mystery alone'],
    ['loyal',2,1,1,0,-1,'remembers who stayed when things went wrong','defends friends past the point of good sense'],
    ['chaotic',0,2,-2,1,2,'can turn a queue into an impromptu parade','has never met a sensible schedule'],
    ['bookish',0,-1,2,2,-1,'has a theory about the ending of everything','sometimes forgets there are people in the room'],
    ['stubborn',0,1,2,-1,0,'will argue with a vending machine','would rather carry a sofa alone than ask for help'],
    ['nurturing',2,-1,1,0,-1,'knows when someone needs soup','can run out of energy helping everyone'],
    ['ambitious',0,1,2,1,0,'has a five-year plan in a school notebook','forgets that people are not milestones'],
    ['sarcastic',-1,0,0,1,1,'has a comeback ready before breakfast','sometimes jokes through a serious moment'],
    ['shy',1,-2,1,1,-1,'makes friends one quiet conversation at a time','rehearses greetings and still forgets them'],
    ['outgoing',1,2,0,0,0,'knows three people everywhere they go','can overshare at breathtaking speed'],
    ['competitive',-1,2,2,0,1,'keeps score at cooperative board games','hates losing even to a six-year-old'],
    ['creative',1,0,-1,2,1,'can find a use for the broken bits','begins six projects before finishing one'],
    ['goofy',1,1,-1,0,2,'believes a rubber chicken improves any occasion','has trouble taking a hint'],
    ['organized',0,-1,2,0,-1,'labels the batteries by emotional availability','panics when a plan changes'],
    ['dramatic',0,1,-1,0,2,'turns making toast into a final-act monologue','can turn every inconvenience into a tragedy'],
    ['chill',1,-1,-1,-1,-1,'can nap while a marching band walks by','might miss an opportunity by waiting'],
    ['superstitious',0,-1,0,2,0,'won’t walk past a ladder without negotiating','reads omens into ordinary bad luck'],
    ['mysterious',-1,-1,1,2,0,'answers questions with suspiciously good questions','doesn’t tell even close friends enough'],
    ['anxious',1,-2,1,0,-1,'packs an umbrella for a cloudless day','mistakes a small risk for a disaster'],
    ['inventive',0,1,-1,2,1,'has prototype number seven in a shoebox','builds first and reads instructions later'],
    ['deadpan',0,0,1,1,1,'makes astonishing jokes without changing expression','can seem rude without intending it'],
    ['theatrical',1,2,-1,1,1,'knows how to make an entrance into a pantry','finds it hard to stay out of the spotlight'],
    ['sneaky',-1,0,1,1,2,'knows which floorboards creak','trust is harder to win back than a prank contest'],
    ['nerdy',1,-1,1,2,0,'will explain the lore if anyone says one keyword','sometimes corrects the wrong person'],
    ['adventurous',0,2,-1,2,1,'keeps a map with several coffee stains','never packs quite enough'],
    ['moody',0,-1,-1,1,0,'makes excellent playlists for terrible days','can push away people who mean well'],
    ['observant',1,-1,2,2,-1,'notices a changed picture frame from across the room','sometimes reads too much into silence'],
    ['eccentric',0,1,-1,2,2,'owns a ceremonial hat for Tuesdays','does not understand why nobody else has one'],
    ['honest',1,0,1,0,-2,'returns lost change even when nobody is watching','sometimes blurts the truth at dinner'],
    ['diplomatic',2,0,1,1,-1,'can resolve arguments over pizza toppings','puts off hard conversations too long'],
    ['grudge-holder',-2,0,2,-1,1,'still remembers the missing birthday slice','sometimes mistakes an apology for a trick'],
    ['show-off',0,2,-1,0,1,'waves from the stage before the show starts','confuses attention with admiration'],
    ['perfectionist',0,-1,2,1,-1,'rewrites thank-you notes three times','has trouble calling a project finished'],
    ['daydreamer',1,-1,-2,2,0,'has built three imaginary kingdoms at the bus stop','occasionally forgets the bus'],
    ['prankster',0,2,-1,1,2,'keeps googly eyes in a coat pocket','doesn’t always know when to stop'],
    ['protective',2,1,1,-1,-1,'always saves someone a seat','can mistake help for control'],
    ['cynical',-1,-1,1,0,-1,'reads the fine print before the headline','sometimes assumes the worst about good people'],
    ['optimistic',2,1,-1,0,-1,'thinks a rainy picnic can still be rescued','occasionally trusts the wrong person'],
    ['patient',2,-2,2,0,-2,'can teach chess to a squirrel','waits too long to speak up'],
    ['impulsive',0,2,-2,0,2,'has purchased a trampoline during a grocery run','starts with yes and works backward'],
    ['frugal',0,-1,2,0,-1,'knows the exact price of every sandwich in town','sometimes misses out trying to save a dollar'],
    ['generous',2,0,-1,0,-1,'gives away the last good cookie','forgets to budget for themselves'],
    ['skeptical',-1,-1,2,2,-1,'asks who wrote the ghost-story poster','can ruin a perfectly good surprise'],
    ['resilient',1,1,2,0,-1,'gets up after falling in the mud','pretends they never need a rest']
  ].map(([id,warmth,nerve,discipline,curiosity,mischief,signature,flaw])=>({id,warmth,nerve,discipline,curiosity,mischief,signature,flaw}));
  const choices = ['kind','curious','loyal','reckless','shy','outgoing','ambitious','creative','prankster','honest','eccentric','competitive','observant','show-off','patient','stubborn'];
  // Story structure: id, age window, focus (a personality attribute), icon, title, setup, three choices.
  // Choices: label, skill, challenge, successful outcome, bad outcome, success effects, failure effects, trait axis, moral tilt.
  const scenes = [
    ['tiny-ruler',0,4,'nerve','🧸','King of the playpen','A toddler named {npc} places a plastic crown on your head and demands tribute. It is half a cracker.',[
      ['Share the crown','social',30,'{npc} declares a co-kingdom. Your first treaty lasts until snack time.','You hand over the crown. {npc} takes the cracker too. Diplomacy is hard.',{happiness:5,social:2},{confidence:-1},'warmth',2],
      ['Declare a blanket-fort war','confidence',40,'Your stuffed rabbit conquers the pillow province.','Your blanket fort folds up around you. A grown-up negotiates a rescue.',{creativity:5,confidence:3},{health:-1,happiness:3},'nerve',0],
      ['Eat the tribute','confidence',15,'You eat the cracker with royal dignity.','You drop it. {npc} calls for a recount.',{happiness:3},{happiness:-2},'mischief',-1]]],
    ['lost-lunchbox',5,11,'warmth','🥪','The lunchbox conspiracy','{npc} opens an empty lunchbox. Somebody has replaced the sandwiches with twenty-seven pictures of a potato.',[
      ['Share your lunch','social',35,'{npc} offers you a handmade thank-you card in the shape of a potato.','You split a dry sandwich. Both of you are still hungry, but not alone.',{happiness:5,reputation:4},{happiness:-1},'warmth',5],
      ['Sell your detective services','smarts',50,'You identify the potato artist. They pay you in trading cards.','Your investigation names three innocent lunch monitors. Nobody hires you again.',{cash:15,smarts:3},{reputation:-4},'curiosity',0],
      ['Blame {npc} publicly','social',45,'The class believes you. {npc} never invites you to sit nearby again.','A teacher finds the potato printer in your backpack.',{reputation:3,alignment:-10},{reputation:-9,alignment:-12},'mischief',-7]]],
    ['science-partner',7,17,'discipline','🧪','The volcano trial','{npc} built a papier-mâché volcano. It looks like a mashed potato wearing a hat. The science fair starts in ten minutes.',[
      ['Repair it carefully','science',43,'The volcano erupts on cue. The judge calls the hat a brave choice.','The vinegar leaks all over your notes. You improvise a talk about plumbing.',{grades:7,confidence:4},{grades:-2,creativity:3},'discipline',3],
      ['Add a surprise second eruption','craft',62,'The second eruption wins the crowd. A small sign falls off the table.','The display board disintegrates. The teacher writes “spectacularly unwise.”',{popularity:6,creativity:5},{grades:-6,stress:5},'mischief',0],
      ['Take all the credit','social',52,'You win a ribbon. {npc} refuses to speak to you after school.','{npc} brings the construction photos. The judge rescinds your ribbon.',{reputation:3,alignment:-12},{reputation:-10,alignment:-12},'warmth',-8]]],
    ['hallway-ticket',8,17,'mischief','🎟️','A very unofficial parking ticket','{npc} is issuing fake parking fines to backpacks abandoned in the hallway. Yours owes $400 and a biscuit.',[
      ['Help write better tickets','writing',40,'Your legal language is convincing enough to earn a warning from the principal.','You accidentally fine the principal’s own briefcase. Detention is discussed.',{writing:5,popularity:3},{grades:-3,stress:3},'mischief',-2],
      ['Expose the fake officer','social',43,'{npc} laughs and appoints you head of appeals.','{npc} calls you a snitch. The backpacks continue to receive citations.',{reputation:5},{popularity:-3},'discipline',3],
      ['Demand a real biscuit','confidence',38,'You are paid in a stale chocolate cookie.','{npc} gives you a drawing of a biscuit with “PAID” written across it.',{happiness:5},{happiness:-1},'nerve',0]]],
    ['band-audition',12,22,'nerve','🎸','The gig without a sound check','{npc} offers you a spot at an open-mic night. The microphone makes a noise like a dying refrigerator.',[
      ['Play through it','music',51,'Your first verse is shaky. Your last gets the room singing.','You freeze at the second chord. {npc} helps finish the song.',{music:6,confidence:7},{music:4,confidence:-3},'nerve',3],
      ['Fix the broken equipment','coding',53,'The cable was the problem. You get a free drink and an encore.','You fix the mic but unplug the piano. This becomes your nickname.',{craft:4,reputation:5},{stress:3,creativity:3},'discipline',2],
      ['Blame the sound engineer','social',55,'The crowd sides with you. {npc} refuses another invitation.','The engineer plays a recording of your wrong notes.',{popularity:4,alignment:-9},{reputation:-8,alignment:-10},'warmth',-7]]],
    ['secret-valentine',12,17,'warmth','💌','A note in the wrong locker','A handwritten crush note meant for {npc} gets stuck to the class trophy instead. Your name is mentioned, incorrectly.',[
      ['Return it quietly','social',47,'{npc} tells you who actually wrote it. You promise to keep the secret.','{npc} snatches the note and flees. You both avoid eye contact for a week.',{social:4,happiness:4},{stress:2},'warmth',4],
      ['Read it aloud for laughs','social',48,'Everyone laughs. {npc} does not. The friendship takes a hit.','Nobody laughs. A teacher watches you fold the note back up.',{popularity:3,alignment:-12},{reputation:-9,alignment:-10},'mischief',-8],
      ['Write an anonymous kind reply','writing',48,'The note writer receives the encouragement they needed.','Your handwriting is recognized. A wildly inaccurate rumor begins.',{writing:5,alignment:6},{popularity:-3},'curiosity',3]]],
    ['bad-group-chat',12,25,'discipline','📱','The screenshot is permanent','{npc} sends a message to the wrong group chat. It is a fourteen-paragraph review of a teacher’s shoes.',[
      ['Warn {npc} privately','social',45,'The message is deleted before the teacher sees it. You get a grateful call.','Three people already took screenshots. {npc} still appreciates the warning.',{social:4,reputation:3},{stress:2},'warmth',4],
      ['Turn it into a meme','media',50,'The meme trends locally. {npc} stops trusting you with secrets.','The original screenshot includes your own terrible reply.',{popularity:6,alignment:-8},{reputation:-9,alignment:-10},'mischief',-7],
      ['Offer to explain to the teacher','writing',49,'The teacher admits the shoes are hideous and accepts the apology.','Your defense is three pages long. The teacher asks if you are a lawyer.',{grades:3,writing:5},{stress:4},'nerve',3]]],
    ['shared-apartment',18,35,'discipline','🧹','The fridge has legal counsel','{npc} left a note on the fridge: “Whoever ate my lasagna will be prosecuted.” You were home when the lasagna vanished.',[
      ['Investigate the crumbs','smarts',50,'The culprit was a visiting cousin. {npc} withdraws the lawsuit.','You discover a stray sock and no useful clues. The fridge trial goes on.',{smarts:4,stress:-3},{stress:4},'curiosity',2],
      ['Replace the lasagna','cooking',42,'Your replacement is better. {npc} begs for the recipe.','You burn it. There is now a second unsolved kitchen incident.',{cooking:5,alignment:5},{cash:-25,stress:5},'warmth',4],
      ['Forge a confession from the cat','writing',54,'The fake confession is funny enough to defuse the fight.','{npc} reads the cat’s statement. “The cat is forty pounds?”',{happiness:6},{reputation:-3,stress:4},'mischief',-1]]],
    ['office-fraud',20,60,'warmth','💼','The numbers do not add up','{npc} has been quietly changing a charity-fundraiser spreadsheet so their department wins an internal contest.',[
      ['Confront {npc} first','social',56,'{npc} corrects the figures and apologizes. Your boss notices your discretion.','{npc} denies everything and accuses you of snooping.',{reputation:6,alignment:5},{stress:8,reputation:-2},'warmth',5],
      ['Report the altered totals','smarts',49,'An audit catches the mistake before money is misplaced.','The boss loses your evidence and asks you to redo the audit.',{reputation:7,smarts:3},{stress:5},'discipline',5],
      ['Use the numbers to win instead','smarts',60,'Your department wins a plastic trophy. {npc} knows exactly what you did.','The auditor calls a meeting. The trophy is confiscated.',{reputation:4,alignment:-13},{reputation:-14,alignment:-15},'mischief',-9]]],
    ['inheritance-argument',25,75,'warmth','📦','One very ugly ceramic swan','At a family gathering, {npc} insists the late aunt’s ceramic swan is priceless. Everyone else insists it is cursed.',[
      ['Suggest a fair lottery','social',47,'The swan goes to {npc}, who proudly puts it in the hall.','Two cousins accuse you of rigging the draw. Over a ceramic swan.',{happiness:5,reputation:4},{stress:5},'warmth',4],
      ['Sell the swan online','social',53,'A collector pays $120. Your family is astonished and faintly horrified.','No bids. You pay shipping to mail it back to yourself.',{cash:120},{cash:-25,stress:3},'discipline',-1],
      ['Declare yourself the rightful heir','confidence',56,'Nobody challenges you. Nobody invites you to the next reunion either.','The swan breaks in transit. {npc} blames you for the curse.',{alignment:-10,happiness:3},{reputation:-9,alignment:-7},'nerve',-7]]],
    ['inventor-fire-drill',20,68,'curiosity','🔧','Patent pending, fire drill pending','{npc} asks you to test a machine that folds laundry by throwing it. Their patent lawyer has not called back.',[
      ['Test it with old towels','craft',52,'The towels land neatly. {npc} starts a small business selling the device.','A towel hits the sprinkler switch. The garage becomes a pond.',{craft:6,cash:100},{cash:-80,stress:4},'curiosity',2],
      ['Market it immediately','social',58,'You sell twenty preorders. Now you must actually deliver.','The first customer demands a refund after their socks fly into a tree.',{cash:180,reputation:4},{cash:-120,reputation:-6},'nerve',-1],
      ['Tell {npc} to scrap it','smarts',50,'{npc} takes the advice and turns the parts into a safer invention.','{npc} takes offense, then accidentally launches a napkin into your face.',{reputation:3},{happiness:-2},'discipline',1]]],
    ['town-parade',9,95,'mischief','🎺','The parade has escaped','{npc} is supposed to lead a neighborhood parade. The mascot has gone missing and there are now three competing marching bands.',[
      ['Organize the bands','social',55,'Everyone marches together. The mayor gives you a tiny ceremonial baton.','The bands all play different songs. {npc} calls it experimental jazz.',{reputation:7,confidence:4},{stress:4,creativity:3},'discipline',3],
      ['Become the new mascot','theater',48,'You enter wearing a homemade dragon costume. The crowd chants your name.','Your costume tail catches on a bench. The audience cheers anyway.',{popularity:6,theater:4},{happiness:3},'nerve',1],
      ['Redirect the parade down your street','social',61,'You get an enormous crowd and several confused delivery drivers.','The bands march into a cul-de-sac and cannot agree who turns around first.',{happiness:8,alignment:-3},{reputation:-4,alignment:-5},'mischief',-3]]],
    ['retirement-rivalry',62,115,'discipline','♟️','The great chair dispute','{npc} has claimed the sunny table in the retirement lounge with a handwritten deed. Nobody remembers voting on this.',[
      ['Challenge the deed at bingo','chess',51,'You win the table in a best-of-three series. The deed is ceremonially shredded.','{npc} beats you and demands the good cushion too.',{happiness:8,confidence:4},{stress:4},'nerve',0],
      ['Start a second table','social',47,'Your table becomes popular. {npc} eventually joins and brings biscuits.','You seat two people who have not spoken since 1987.',{social:6,reputation:5},{stress:5},'warmth',5],
      ['Steal the deed','craft',56,'The paper turns out to be a grocery list. You both laugh.','{npc} catches you, reads a speech, and names you chair thief of the year.',{happiness:5,alignment:-4},{reputation:-6,alignment:-7},'mischief',-4]]],
    ['night-sky',6,115,'curiosity','🪐','Something above the water tower','{npc} spots a pulsing light over the old water tower. The newspaper calls it a weather balloon. The balloon denies involvement.',[
      ['Bring binoculars and take notes','astronomy',49,'You photograph a rare meteor shower. The observatory asks for a copy.','You watch for hours. A moth blocks the lens at the crucial moment.',{astronomy:7,smarts:3},{astronomy:3,stress:2},'curiosity',3],
      ['Tell everyone it was a spacecraft','social',55,'Your theory starts a midnight skywatch club. Nobody proves a thing.','The light is an advertising drone. The whole town remembers your speech.',{popularity:5},{reputation:-6},'nerve',-1],
      ['Ignore it and bring {npc} home','social',40,'{npc} thanks you for staying with them. The light disappears at dawn.','The light is never explained. {npc} continues sending you blurry photos.',{happiness:4},{stress:2},'warmth',2]]]
  ].map(([id,min,max,focus,icon,title,setup,choices])=>({id,min,max,focus,icon,title,setup,choices}));
  // Repeatable self-discovery should not mean the same goat every year.
  // Four genuinely different choices in each moment: careful, wild, kind, bold.
  const reflections = [
    ['class-pet',5,11,'A class pet with terrible timing','{name} is put in charge of the classroom hamster. It escapes during the spelling test.',[
      ['Organize a careful search','You find the hamster asleep in the dictionary.','Your search team loses the hamster and the dictionary.'],
      ['Build a ridiculous hamster trap','The hamster enters your cardboard tunnel and demands a sunflower seed.','Your trap catches the vice principal’s shoe.'],
      ['Help {name} admit what happened','The teacher is relieved, and {name} finally breathes again.','{name} starts crying before the confession. You stay anyway.'],
      ['Volunteer to crawl behind the shelves','You crawl out holding the hamster like a tiny champion.','You get stuck and the custodian must rescue you.']]],
    ['carnival',5,11,'The carnival booth that nobody wanted','At the school carnival, {name} is stuck running a ring-toss stall with three crooked bottles and no prizes.',[
      ['Make the stall fair','The new rules bring a long line of delighted kids.','A teacher questions your arithmetic. You rewrite the scoreboard.'],
      ['Invent a secret bonus round','The crowd loves it. Someone wins a stuffed turnip.','You run out of prizes. A paper certificate must do.'],
      ['Share your prizes with younger children','One shy kid wins a plush dragon. {name} hugs you.','Two children argue about the same frog. You organize a coin toss.'],
      ['Challenge the unbeaten champion','You win on the last throw, surprising everyone.','You miss every ring. The crowd still gives you a cheer.']]],
    ['museum-night',5,11,'A missing museum dinosaur','{name} shows you a life-size dinosaur made entirely of cardboard. It has been moved from the school exhibition.',[
      ['Check the inventory list','You find the dinosaur next to the janitor’s closet.','The inventory says “one dinosaur, probably.” This is not helpful.'],
      ['Dress up as a dinosaur decoy','The principal gives you a prize for creative problem-solving.','You fall over your own cardboard tail.'],
      ['Comfort its embarrassed creator','{name} admits how much work went into the dinosaur. You help find it.','The creator cries, then makes a new cardboard claw with you.'],
      ['Question the night guard','The guard remembers a delivery van. The mystery is solved.','The guard says the van was a parked bus. You apologize.']]],
    ['school-paper',12,17,'An unfortunate school headline','{name} accidentally prints a headline declaring the principal the new cafeteria mascot.',[
      ['Pull the copies before delivery','Only two teachers see it. The principal laughs, eventually.','You catch all but one copy, pinned to the notice board.'],
      ['Start a fake mascot election','The whole school votes for a waffle. The principal concedes.','The waffle campaign gets you called to the office.'],
      ['Take responsibility with {name}','The principal appreciates the apology and lets the paper continue.','You both spend lunch folding replacement newsletters.'],
      ['Defend the editors at assembly','Your argument is surprisingly convincing.','Your speech turns into a long, awkward silence.']]],
    ['band-battle',12,17,'Battle of the basement bands','{name} booked two bands for the same garage at the same time. Both think they are the headliner.',[
      ['Set an actual running order','The show finishes on time, miraculously.','The drummer refuses the schedule and plays a twenty-minute solo.'],
      ['Propose a surprise supergroup','The improvised song becomes the hit of the night.','Six guitarists play six different keys. Nobody hears the singer.'],
      ['Give the quieter group a fair shot','The shy singer brings the room to its feet.','The group has a shaky first song. You stay and cheer.'],
      ['Step up and host the show','You handle the hecklers and keep the music going.','You introduce the wrong band twice. The crowd takes pity on you.']]],
    ['school-trip',12,17,'The wrong bus','A field trip leaves the museum and {name} gets on the wrong bus. A second student insists this is the right one.',[
      ['Check the route and call a teacher','Both students get home, followed by a very stern lecture.','The teacher puts you on hold. You keep everyone calm.'],
      ['Declare the trip an adventure','You discover a tiny railway museum on the way back.','Your detour leads to a parking lot full of recycling bins.'],
      ['Stay with {name} until help arrives','{name} admits they were frightened. You make a joke and wait together.','The wait is long and cold. You share your last snack.'],
      ['Ask the driver to change course','The driver helps and gets you back to the group.','The driver says routes are not optional. You call the school.']]],
    ['office-potluck',18,61,'The extremely competitive potluck','{name} organizes an office potluck. The boss has entered a suspiciously perfect cake.',[
      ['Make a fair tasting ballot','Everyone gets a vote. The janitor’s pie wins.','The office argues about whether icing counts as a vegetable.'],
      ['Bring an outrageous surprise dish','Your five-layer lasagna becomes legendary.','Your cake collapses in the elevator. It tastes good anyway.'],
      ['Help the nervous new hire','Their soup earns the first genuine compliment they have heard all week.','Their soup is too salty. You quietly help serve bread.'],
      ['Challenge the boss directly','Your dessert wins. The boss requests the recipe.','The boss wins. You shake hands through gritted teeth.']]],
    ['neighborhood-bridge',18,61,'The bridge is closed for ducks','{name} has convinced the council to close a footbridge for nesting ducks. The morning commuters are furious.',[
      ['Draw a safe detour map','The council posts your map. The ducks get their peace.','Your map leads a runner into a mud puddle. You fix it quickly.'],
      ['Install duck crossing signs','The signs go viral. A duck appears to pose by one.','The ducks ignore the signs with professional indifference.'],
      ['Listen to both sides','Commuters agree to a two-week closure. {name} thanks you.','The meeting runs four hours. You keep pouring coffee.'],
      ['Speak at the council meeting','You convince them to build a tiny duck ramp.','Your proposal is rejected, but the council offers another route.']]],
    ['small-business',18,61,'The bakery that became famous by mistake','{name} posts the wrong photo on a neighborhood bakery page. Instead of muffins, the town sees a furious-looking pet lizard.',[
      ['Correct the page and explain','Customers appreciate the apology. The bakery sells out anyway.','People keep requesting lizard cakes. You update the menu board.'],
      ['Make the lizard the mascot','A dozen customers order lizard-shaped pastries.','The lizard refuses to sit for promotional photos.'],
      ['Help {name} face the owner','The owner laughs so hard they give {name} a raise.','The owner asks you both to rewrite the posting rules.'],
      ['Pitch a proper advertising campaign','Your ideas bring in new customers.','The boss says the lizard was better marketing. It probably was.']]],
    ['senior-theater',62,115,'The play no one rehearsed','{name} volunteers you for the retirement-community production. The script has gone missing, and tonight is opening night.',[
      ['Recover the rehearsal notes','You rebuild the play and everyone remembers their cues.','The villain enters in act one instead of act three. You improvise.'],
      ['Turn it into improvised comedy','The audience laughs until the curtains shake.','Your improvised plot involves a royal goose. Nobody can explain act two.'],
      ['Give {name} the lead','They forget the first line but recover beautifully.','They freeze. You step onto the stage and quietly prompt them.'],
      ['Take the stage yourself','You deliver a grand monologue to a standing ovation.','You forget a line and announce the interval three minutes early.']]],
    ['garden-feud',62,115,'The disputed giant pumpkin','{name} has grown a pumpkin larger than a microwave. Their neighbor claims to have watered it once and wants half the prize.',[
      ['Find the competition rules','The judges give the prize to the actual gardener.','The rules say nothing about emotional support watering.'],
      ['Stage a pumpkin parade','The whole community turns out to cheer the vegetable.','The pumpkin cart loses a wheel and becomes a stationary attraction.'],
      ['Offer to split the trophy','The neighbors finally shake hands.','Both insist the other should take it. The trophy stays on the porch.'],
      ['Challenge the neighbor to a grow-off','You judge next year’s contest; {name} wins fairly.','The neighbor grows a courgette and calls it a moral victory.']]],
    ['retirement-radio',62,115,'An unauthorized radio show','{name} finds an old transmitter at the retirement home. The residents want to broadcast song requests through the building.',[
      ['Set up a sensible schedule','The afternoon show becomes a tradition.','The bingo announcements interrupt every third song.'],
      ['Start a midnight pirate broadcast','Residents stay up laughing at the silly jingles.','The manager follows the signal to the broom cupboard.'],
      ['Dedicate the first song to a lonely resident','Someone knocks on your door the next morning to say thank you.','The resident cries during the song. You sit with them afterward.'],
      ['Host live requests yourself','Your voice becomes famous throughout the building.','You read the wrong dedication and invent a new couple.']]]
  ].map(([id,min,max,title,setup,choices])=>({id,min,max,title,setup,choices}));

  const deaths = [
    ['🧀','The cheese-wheel incident','A runaway cheese wheel during the annual dairy festival caused a chain of mishaps that nobody in town has ever been able to explain.'],
    ['🎩','The magician’s last trick','At a community magic show, a spectacularly unlucky stage accident ended your story. The magician retired his top hat.'],
    ['🦆','The great duck detour','You were leading a very slow duck parade when a freak accident brought the procession to a stop. The ducks finished the route in your honor.'],
    ['🎺','One last marching band','A freak mishap during the town parade was your final curtain call. The band played your favorite tune the following year.'],
    ['🌪️','Weather had other plans','A once-in-a-century storm surprised the town. Friends still tell stories about how calmly you helped before everything changed.'],
    ['🎪','The inflatable-castle disaster','An inflatable castle and an extraordinary series of unlikely mechanical failures made headlines for weeks. The safety inspector has since become a local legend.'],
    ['🚀','The amateur rocket club','A strange accident at a rocket-club demonstration ended your adventures. The club dedicated its next safe launch to you.'],
    ['🏰','The medieval-fair mishap','The reenactment was supposed to be entirely pretend. An unfortunate accident ended the fair early, and the guild retired your banner.'],
    ['🎈','The balloonist’s unexpected landing','An unseasonable squall caught your sightseeing balloon. Your family saved the scrapbook from all your earlier flights.'],
    ['🛷','The sledding championship','A freak accident at the town’s winter games cut the celebrations short. The next event carried your name, and sensible helmets.'],
    ['🎡','The carnival mechanical failure','A rare mechanical failure at the county carnival ended a life full of detours. The carnival introduced new safety rules afterward.'],
    ['🦎','The lizard sanctuary fundraiser','A bizarre accident at the reptile sanctuary became the town’s strangest cautionary tale. The rescued lizards, at least, were all fine.']
  ].map(([icon,title,text])=>({icon,title,text}));
  return {profiles,choices,scenes,reflections,deaths};
})();