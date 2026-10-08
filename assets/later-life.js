/* The later chapters. All scenes are written for the game, not assembled from generic templates.
   Keep IDs stable: visited events and multi-year chapters use these IDs in saved games. */
window.LITTLE_LIFE_LATER = (()=>{
const C=(label,good,bad,skill,ok={},no={},extra={})=>({label,good,bad,skill,ok,no,...extra});
const S=(id,period,icon,title,text,choices,gate)=>({id:'later_'+id,period,icon,title,text,choices,gate});
const scenes=[
// TEEN: school, loyalty, sibling chaos, danger, money, reputation, attraction, growth.
S('sleepover','teen','🍿','The midnight treaty','{friend} invites you to a sleepover. At 2:13 a.m., someone whispers: “I found the spare key to the attic.”',[
 C('Follow the flashlight','You find a trunk of baby photos and a medal nobody can explain. You and {friend} swear to investigate.','The attic stairs creak. You wake the entire house and spend the night in separate bedrooms.','confidence',{happiness:10,social:5,flag:'atticMedal',follow:{years:4,text:'An old family photo turns up with the same medal you found in the attic. {friend} still wants answers.',effects:{smarts:5}}},{stress:7,bond:-4}),
 C('Stay downstairs and make pancakes','Your pancakes resemble clouds. The host’s little brother declares you a genius.','You burn a pan. The fire alarm joins the party and the adults get involved.','cooking',{cooking:8,bond:10},{stress:9,confidence:-3})]),
S('foodfight','teen','🍝','Operation Marinara','Someone launches a ravioli at the cafeteria wall. In three seconds, the whole lunchroom is picking sides.',[
 C('Stop the flying lunch','You shield a younger student with your tray. The principal thanks you; your hoodie never recovers.','A flying milk carton takes you out. The nurse sends you home with an ice pack.','sports',{alignment:10,reputation:9},{health:-9,happiness:-4}),
 C('Launch a counterattack','Your bread-roll throw is legendary. Unfortunately, the lunch lady knows your name.','You slip on spaghetti and wind up in detention wearing tomato sauce.','sports',{popularity:12,detention:1,alignment:-8},{injury:'sprain',detention:2,alignment:-10}),
 C('Record the chaos','The video becomes a school meme. You later regret the comments on it.','A teacher catches you filming instead of helping clean up.','media',{popularity:10,stress:3},{detention:1,popularity:-6})]),
S('lunch_money','teen','💵','The five-dollar problem','You find five dollars beside the vending machine. A seventh grader is searching the floor, nearly in tears.',[
 C('Hand it over','The kid buys lunch and leaves a thank-you note in your locker the next day.','They think you stole it in the first place. A teacher clears things up, eventually.','social',{alignment:13,reputation:6},{alignment:9,stress:4}),
 C('Keep it','You buy three bags of chips and tell yourself it probably wasn’t theirs.','Someone recognizes the money clip. You give it back, embarrassed.','confidence',{cash:5,alignment:-11},{reputation:-9,alignment:-13})]),
S('groupchat','teen','📱','Screenshots live forever','An unflattering screenshot of {friend} is making the rounds. The person who sent it is waiting for your reaction.',[
 C('Tell everyone to delete it','Three classmates back you up. {friend} finds out who actually defended them.','The sender turns the joke on you. It is a rough few weeks.','social',{alignment:15,bond:15},{alignment:8,popularity:-12,bond:6}),
 C('Forward it with a joke','For a day, you are the funniest person in the group. Then {friend} reads it.','The screenshot lands in a teacher’s inbox with your name attached.','media',{popularity:9,bond:-27,alignment:-17,social:'rival'},{suspension:1,bond:-24,alignment:-17,social:'rival'})]),
S('talentnight','teen','🎤','A microphone with your name on it','The school talent show needs one final performer. A kid in the front row is already booing the empty stage.',[
 C('Play the song you practiced','You nail the chorus. The music teacher asks if you want to record something after school.','You forget a verse and improvise one about the cafeteria pizza. It still gets laughs.','music',{music:9,popularity:12,flag:'talentShow'}, {music:7,confidence:-3,popularity:4}),
 C('Do a comedy routine','Your impression of the school bell sends the audience into hysterics.','Your first joke falls flat. The second is worse. The principal still shakes your hand.','social',{popularity:14,confidence:8},{confidence:-10,stress:6})]),
S('parkinglot','teen','🚗','The driving lesson','Your driving instructor has set out six traffic cones and looks like a person who has seen things.',[
 C('Take it slow','You finish the course without a scratch and get a compliment you will treasure forever.','You stall at a stop sign while a pigeon watches you critically.','smarts',{confidence:9,sports:4},{confidence:-5,stress:5}),
 C('Try to impress everyone','The car stops exactly between the cones. Pure luck, but you are taking credit.','You bump a cone and spend half the lesson listening to a lecture.','sports',{confidence:12},{confidence:-12,stress:7})], 'licensed'),
S('rivalnotes','teen','📓','The answers on the desk','The teacher steps out. Your rival’s perfect test answers are lying open next to you.',[
 C('Leave them alone','Your own grade is solid. No one can take that away.','You struggle through the last question and earn a lower grade than you hoped.','grades',{grades:10,confidence:6,alignment:10},{grades:-4,alignment:8}),
 C('Copy the answers','You get the grade. Your rival knows. They are not pleased.','The teacher catches matching mistakes. Your parents get a call before lunch.','smarts',{grades:13,alignment:-18,stress:9},{grades:-24,suspension:1,alignment:-18})]),
S('schooldance','teen','🪩','The last slow song','The DJ plays a slow song. {friend} is sitting alone because someone stood them up.',[
 C('Ask them to dance','You step on a foot, laugh, and save the evening.','They say no, politely. You stay beside them and heckle the DJ’s playlist.','social',{bond:19,happiness:11,popularity:5},{bond:9,confidence:-5}),
 C('Pretend you did not notice','You avoid the awkwardness. Your friends spend the night taking selfies.','They see you look away. It takes months before things feel normal again.','confidence',{happiness:3,alignment:-6},{bond:-20,alignment:-9})]),
S('scienceexplode','teen','🧪','The science fair disaster','Your volcano starts smoking before the judges even arrive. Your partner insists the smoke is “part of the atmosphere.”',[
 C('Shut it down and fix the leak','You salvage the demonstration and win an honorable mention.','The display collapses into a swamp of papier-mâché. The judge praises your safety instincts.','science',{science:10,grades:8},{grades:3,stress:7}),
 C('Pretend everything is normal','The smoke clears. Your presentation is absurdly dramatic and everyone remembers it.','The gym is evacuated. Nobody is impressed with your commitment to the bit.','theater',{popularity:12,science:5},{suspension:1,grades:-10,stress:12})]),
S('lockerletter','teen','💌','The mystery locker note','Someone slips a note under your locker door: “Meet me behind the gym. I have your frog.” You do not own a frog.',[
 C('Go with {friend} as backup','It is a classmate returning a rubber frog from a long-forgotten prank. Mystery solved.','A teacher thinks you are skipping class. Explaining the frog does not help.','social',{bond:8,happiness:9},{detention:1,stress:4}),
 C('Write back as the frog','Your reply starts a week-long anonymous correspondence. The frog gets elected class mascot.','You accidentally deliver the note to the vice principal. They ask to meet the frog.','writing',{writing:8,popularity:9},{stress:6,confidence:3})]),
S('siblingconcert','teen','🎸','Your sibling’s terrible band','Your sibling is playing their first gig at the community center. Every song is somehow eight minutes long.',[
 C('Show up and cheer','They are so happy to see you that they dedicate a song to you. It is called “My Annoying Sibling.”','You clap in the wrong place for every song. They still hug you afterward.','social',{bond:14,target:'siblingId',happiness:6},{bond:9,target:'siblingId'}),
 C('Make fun of the band afterward','Everyone laughs at your impression of the drummer. Your sibling stops speaking to you.','Your sibling fires back with a story about your childhood haircut. The room turns on you.','social',{alignment:-8,bond:-23,target:'siblingId'},{alignment:-7,confidence:-9})], 'sibling'),
S('vendingmachine','teen','🥨','A machine ate your money','The vending machine accepts your last dollar and gives you nothing. {friend} suggests “a little strategic violence.”',[
 C('Ask the office for help','The custodian opens it, retrieves your snack, and hands you a second one.','The office gives you a refund slip that somehow requires three signatures.','social',{cash:1,happiness:7},{stress:5}),
 C('Shake the machine','A shower of candy bars makes you a temporary legend. Then the camera footage is reviewed.','The machine tips forward. You jump clear, but the principal writes you up.','sports',{popularity:13,detention:1,alignment:-5},{injury:'sprain',suspension:1,alignment:-9})]),
S('debatefinal','teen','🎙️','The debate championship','Your opponent opens with a suspiciously good joke about your hometown. Your coach’s face says “do not take the bait.”',[
 C('Stick to the evidence','You find a hole in their argument. The room goes quiet, then applauds.','You lose on points, but the judges compliment your research.','writing',{grades:8,writing:9,popularity:7},{writing:7,confidence:-4}),
 C('Go for a ruthless personal joke','You win the room. Your opponent walks out furious.','Nobody laughs. Your coach spends the ride home staring at the road.','social',{popularity:13,alignment:-12},{reputation:-11,alignment:-12,stress:8})], 'debate'),
S('sleepovertruth','teen','🛌','Truth or dare went too far','The sleepover group dares you to text an embarrassing confession to someone at school.',[
 C('Tell a genuine secret instead','Your friends listen. Someone admits they have been having a hard time too.','The room gets awkward, then one person thanks you afterward.','social',{bond:16,happiness:9},{bond:8,stress:4}),
 C('Send the dare text','The recipient thinks you are serious. By morning the entire grade knows.','You accidentally send it to the school librarian, who replies: “I’m glad you trust me.”','media',{popularity:8,stress:13},{confidence:-7,popularity:-5})]),
S('practiceinjury','teen','🏀','The championship game','Your ankle twists during warmups. The coach says the team can manage without you. Your pride disagrees.',[
 C('Sit out and help coach','Your replacement scores the winning point. You are the first person to congratulate them.','The team loses. Your teammate thanks you for not making the injury worse.','social',{sports:7,alignment:9,health:4},{sports:4,stress:5}),
 C('Play through it','You score the final point and limp off to applause. The doctor is not happy.','Your ankle gives out and you spend the next month in a boot.','sports',{popularity:12,injury:'sprain'},{injury:'fracture',health:-12,stress:10})]),
S('cheaterfriend','teen','🤝','The friend who cheated','{friend} admits they stole your answer sheet before the exam. Nobody else knows.',[
 C('Demand an apology and set a boundary','They apologize. It takes a while, but trust begins to come back.','They get defensive and the friendship cools off.','social',{bond:9,alignment:9},{bond:-16,confidence:5}),
 C('Use the secret against them','They do all your homework for weeks. You feel powerful and pretty awful.','They tell everyone what you are doing. Now you look worse than they do.','social',{grades:12,alignment:-25,bond:-21},{reputation:-18,alignment:-23,social:'rival'})]),
S('busmiss','teen','🚌','The last bus','You and {friend} miss the last bus after a school event. There is one bench, a dying phone, and rain incoming.',[
 C('Call an adult and wait','A parent arrives with blankets and a lecture about planning.','You spend forty cold minutes under an awning, but get home safely.','social',{bond:9,happiness:5},{stress:8,health:-3}),
 C('Try walking the long way','You discover a tiny diner with legendary fries and get home just before midnight.','You take the wrong road and end up calling for a ride anyway.','smarts',{happiness:12,confidence:7},{stress:12,confidence:-6})]),
S('yearbook','teen','📸','The yearbook vote','Your class nominates the strictest teacher for “Most Likely to Secretly Be a Wizard.” The yearbook editor wants your approval.',[
 C('Keep it kind and ask the teacher','She laughs so hard she nearly spills her coffee and agrees.','She refuses but nominates herself for “Most Likely to Confiscate a Wand.”','social',{popularity:9,alignment:8},{writing:5,alignment:8}),
 C('Publish it without asking','The whole school shares the page. The teacher does not.','The printed books have to be corrected at your expense.','media',{popularity:13,reputation:-5},{cash:-120,detention:1,reputation:-10})]),
S('examnight','teen','📚','The exam and the party','The biggest exam of the year is tomorrow. {friend} sends you a party address and the message “ONE NIGHT ONLY.”',[
 C('Study and go home early','You walk into the exam ready. Your grade lifts your scholarship chances.','The exam is tougher than you expected, but you still did the work.','smarts',{grades:17,stress:-4},{grades:5,stress:7}),
 C('Go to the party until sunrise','You have a great night and the group adopts a stray inflatable flamingo.','You sleep through the exam. Your school calls home.','social',{happiness:14,grades:-10},{grades:-24,stress:13,popularity:5})]),
S('firstgig','teen','🎸','The basement concert','A classmate offers your band its first paying gig: twenty dollars and all the lemonade you can drink.',[
 C('Rehearse and take the stage','You play a tight set. Someone asks when they can see you again.','Your amplifier dies during the second song, so the audience sings the chorus instead.','music',{cash:20,music:12,popularity:10,flag:'firstGig'},{cash:20,music:6,happiness:7}),
 C('Tell everyone you are famous now','Your ridiculous poster draws a crowd. Your friends keep it on the wall for years.','Nobody comes except your uncle, who requests country music all night.','media',{popularity:8,confidence:6},{confidence:-9,happiness:-7})], 'musician'),
S('graduationprank','teen','🎓','The graduation prank','A classmate wants to replace the principal’s graduation speech with a slideshow of embarrassing staff photos.',[
 C('Suggest a harmless farewell video','The teachers laugh and the principal gets teary-eyed.','The projector freezes on the librarian’s childhood haircut for ninety seconds.','media',{alignment:10,popularity:10},{popularity:7,stress:4}),
 C('Help swap the slides','The whole hall erupts. Your name is somehow left off the graduation program.','The principal finds out before the ceremony and you are banned from the stage.','coding',{popularity:17,suspension:1,alignment:-14},{reputation:-18,alignment:-14,stress:13})]),
S('onlinehero','teen','🎮','The final raid','Your co-op team reaches the last boss at midnight. {friend} has been getting blamed for every wipe.',[
 C('Defend them and lead the group','You coordinate one final attempt and win with two players standing.','The team wipes again, but everyone apologizes. You stay friends.','gaming',{gaming:11,social:8,bond:12},{gaming:5,bond:12}),
 C('Kick them to save the run','The boss falls. The victory screen feels strangely empty.','The replacement disconnects immediately. Your team falls apart.','gaming',{gaming:7,bond:-25,alignment:-11},{bond:-28,alignment:-12,stress:8,social:'rival'})]),
// YOUNG ADULT: rough entry into adulthood, career risks, roommates and love.
S('roommategoat','young','🐐','The illegal roommate','Your roommate reveals that the “dog” in their room is a miniature goat named Executive Vice President.',[
 C('Negotiate rules with the goat’s owner','The goat gets rehomed to a farm after one last apartment photo shoot.','Your roommate agrees to pay for the carpet. The landlord still finds out.','social',{stress:-7,happiness:8},{cash:-180,stress:11}),
 C('Pretend not to see anything','The goat becomes an internet celebrity. Your apartment becomes an accidental tourist attraction.','The goat eats your deposit paperwork and part of a curtain.','media',{cash:250,popularity:10},{cash:-600,stress:12})]),
S('firstflat','young','🏠','The apartment inspection','You tour a cheap apartment. It has great windows, a suspicious smell, and a sign that says “DO NOT FEED THE WALL.”',[
 C('Ask about the wall','The landlord admits there was once a pet iguana. The smell is bleach. You walk away wisely.','The landlord changes the subject. You decide not to sign anything.','smarts',{confidence:6},{stress:3}),
 C('Sign before somebody else does','It is the bargain of the year. The wall is just a terrible mural.','The plumbing breaks on move-in day. Your savings take the hit.','smarts',{happiness:13,cash:-500},{cash:-2400,stress:16})]),
S('interviewcoffee','young','☕','The coffee spill interview','You reach the final interview for a job you really want. Then you spill coffee across the recruiter’s notes.',[
 C('Own it and help clean up','They laugh and say you handled a bad situation well. You get a second interview.','They appreciate your honesty, but offer the position to somebody else.','social',{confidence:10,reputation:6},{confidence:-6,stress:6}),
 C('Blame the wobbly table','They believe you. You spend the entire interview avoiding eye contact with the table.','The recruiter saw everything. You do not get a callback.','confidence',{confidence:5,alignment:-7},{confidence:-13,alignment:-8})]),
S('sidebusiness','young','🧁','The midnight cookie empire','A friend says your homemade cookies deserve a business. Your first customer orders two hundred.',[
 C('Bake through the night','The order sells out and the café asks for a standing deal.','You misread teaspoons as tablespoons. The cookies taste like a salt mine.','cooking',{cash:950,cooking:10,flag:'cookieBusiness'},{cash:-170,stress:12,cooking:4}),
 C('Take a deposit and disappear','You keep the deposit. The group chat is not kind about it.','The customer finds you at work demanding a refund.','social',{cash:250,alignment:-25,reputation:-12},{cash:-400,alignment:-27,record:1})]),
S('weddingtoast','young','🥂','The wedding toast','Your best friend asks you to speak at their wedding. Their new in-laws look terrifyingly formal.',[
 C('Tell the story of your first meeting','The room laughs in the right places. Your friend cries at the end.','You choke up halfway through and the room gently applauds.','writing',{bond:17,happiness:10},{bond:12,confidence:-3}),
 C('Tell the embarrassing vacation story','The room erupts. The happy couple forgives you by dessert.','The new mother-in-law does not speak to you for three years.','social',{popularity:10,bond:5},{bond:-16,stress:8})]),
S('eviction','young','📦','Thirty days to move','A letter arrives: the landlord is selling the building. You have thirty days to find a new place.',[
 C('Ask friends for help','You find a place through someone’s aunt and move with the help of five people and one unreliable van.','You couch-surf for a month. It is uncomfortable, but you get through it.','social',{cash:-650,bond:7},{cash:-1100,stress:17}),
 C('Ignore the letter until the last week','A roommate helps you pack in a single chaotic night.','Your belongings go into storage and the bill is ugly.','smarts',{stress:12,cash:-400},{cash:-2100,stress:24})]),
S('bandvan','young','🎵','The van will not start','Your band’s first out-of-town show is tonight. The van makes a noise best described as “metal coughing.”',[
 C('Fix it yourself','You replace a worn belt and make the show with twenty minutes to spare.','You call a mechanic and arrive late. The crowd stays for the music.','craft',{music:10,cash:400,flag:'tourGig'},{cash:-210,music:6}),
 C('Cancel and post an apology','Fans appreciate the honesty and a better venue offers a new date.','Half your audience asks for refunds. Your drummer quits.','media',{reputation:8},{cash:-250,stress:12})], 'musician'),
S('frienddebt','young','💳','The friend who owes you','{friend} borrowed money for car repairs six months ago. They just posted photos from a luxury resort.',[
 C('Ask directly for repayment','They admit they have been avoiding you and arrange installments.','They get defensive. You agree on a smaller amount just to end the argument.','social',{cash:350,bond:7},{cash:120,bond:-13}),
 C('Expose them to the group chat','You get the money back fast. The friendship might be over.','Your friends tell you to handle it privately.','media',{cash:350,bond:-24,alignment:-13},{bond:-30,popularity:-11,alignment:-9})]),
S('studiopitch','young','🎮','The impossible game pitch','A small publisher offers you one meeting. Your prototype features a knight who runs a bakery for ghosts.',[
 C('Show the messy working demo','They see the potential. You receive funding for a six-month prototype.','The game crashes on the title screen. They still send detailed notes.','coding',{cash:3000,coding:12,flag:'publishedPitch'},{coding:8,confidence:-4}),
 C('Promise features that do not exist','The publisher asks for a contract. You now have a problem that wears a suit.','A technical question exposes the entire bluff. The meeting ends early.','social',{cash:600,stress:16,alignment:-11},{reputation:-12,alignment:-12})], 'developer'),
S('birthdayalone','young','🎂','Nobody remembered','You spend your birthday waiting for someone to call. The only notification is a grocery-store coupon.',[
 C('Plan your own absurdly good day','You visit the aquarium, eat cake for dinner, and take the best photo of your year.','The aquarium is closed. You buy the cake anyway and watch a favorite movie.','confidence',{happiness:17,stress:-8},{happiness:9,stress:-4}),
 C('Tell {friend} you feel forgotten','They apologize and show up with a supermarket cake and a single candle.','They are dealing with trouble of their own. You talk until sunrise.','social',{bond:19,happiness:13},{bond:13,happiness:6})]),
S('badboss','young','📧','Reply all','Your manager sends a rude message meant for one person. They accidentally send it to the entire company.',[
 C('Speak to them privately','They apologize and change how they speak to the team.','They brush you off. You start looking for better work.','social',{reputation:8,alignment:10},{confidence:-5,stress:8}),
 C('Forward it to everyone again','Your coworkers laugh. Your boss remembers your name at performance-review time.','Human Resources requests a very uncomfortable meeting.','media',{popularity:9,stress:9,alignment:-7},{reputation:-20,stress:15})], 'job'),
S('marathon','young','🏃','Halfway up Heartbreak Hill','You signed up for a charity race. At mile eight, a runner beside you sits down looking defeated.',[
 C('Slow down and run together','You finish side by side. Their family thanks you at the finish line.','You walk the last miles together and finish well after sunset.','sports',{alignment:13,health:8,happiness:10},{alignment:12,health:3}),
 C('Chase your personal record','You finish in your best time and get a cheap medal.','You push too hard and need weeks of recovery.','sports',{sports:12,confidence:10},{injury:'sprain',health:-10})]),
S('missinginherit','young','📦','The envelope from an aunt','A distant aunt leaves you a box. Inside is a map marked “NOT THE GOOD ONE” and a brass key.',[
 C('Track down the address','You discover a tiny workshop full of clocks, and a letter explaining why she kept them.','The address is a parking lot now. The key opens a biscuit tin full of family photographs.','smarts',{cash:700,smarts:10,flag:'auntKey'},{happiness:9,writing:4}),
 C('Sell the whole box','A collector gives you more money than you expected.','The buyer tells you the map was drawn by a notorious prankster. You sold a family joke.','social',{cash:900},{cash:85,stress:3})]),
S('lostpass','young','🛂','The passport problem','You arrive at the airport for a long-planned holiday. Your passport is not in your bag. The plane leaves in two hours.',[
 C('Retrace your steps','You find it inside a book at the airport café. You make the flight.','The hotel lets you reschedule and you spend the night at home eating airport snacks.','smarts',{happiness:13,confidence:8},{cash:-240,stress:7}),
 C('Try to talk your way aboard','An agent directs you to the proper replacement process. The trip is postponed.','Security escorts you back to the terminal lobby. You miss the flight.','social',{stress:4},{cash:-620,stress:14})]),
S('roommatefire','young','🍳','The smoke alarm symphony','Your roommate leaves frozen pizza in the oven for an hour. The building alarm announces the news to six floors.',[
 C('Help evacuate everyone','You get the upstairs neighbor’s sleepy cat outside safely. The fire crew thanks you.','Your shoes are still indoors. The entire block sees your cartoon slippers.','social',{alignment:13,reputation:8},{happiness:5,alignment:8}),
 C('Blame a neighboring apartment','The building manager believes you at first. Your roommate owes you one.','A hallway camera catches the pizza carrying the evidence out in a cloud of smoke.','social',{alignment:-14,reputation:-4},{alignment:-18,cash:-450,stress:13})]),
// ADULTHOOD: careers, raising children, divorce, health, financial calamity, moral trades.
S('officeleak','adult','🗂️','The files nobody was meant to see','An office spreadsheet accidentally exposes that two employees doing the same work earn very different salaries.',[
 C('Raise it through proper channels','The company corrects the pay gap. People quietly thank you.','Management stalls. You and your colleagues document the problem and keep pressing.','social',{alignment:15,reputation:9},{alignment:11,stress:10}),
 C('Sell the story to a gossip account','You get paid for the tip. Your coworkers no longer trust you with anything.','The reporter publishes your name. Your boss demands a meeting.','media',{cash:800,alignment:-18,reputation:-13},{alignment:-17,reputation:-23,stress:15})], 'job'),
S('kidrobot','adult','🤖','The robot ate the remote','Your child has built a robot for the school expo. It recognizes exactly one command: “ATTACK THE TV REMOTE.”',[
 C('Help repair the code','The robot delivers a perfect handshake to the judges. Your child is thrilled.','The robot drives in circles. Your kid wins an award for creative engineering.','coding',{bond:15,target:'kidId',coding:7},{bond:13,target:'kidId',happiness:5}),
 C('Let them figure it out','They stay up debugging and solve it themselves. They cannot stop smiling.','They get frustrated and abandon the project for a week.','social',{bond:9,target:'kidId',smarts:5},{bond:-5,target:'kidId',stress:7})], 'kid'),
S('houseflood','adult','🚰','The kitchen is now a lake','A pipe bursts under the sink at six in the morning. The dog is floating a rubber duck across the floor.',[
 C('Shut off the water and call a plumber','You save the hardwood. The bill still hurts.','The shutoff valve is stuck. Your neighbor helps keep the water out of the hall.','smarts',{cash:-370,confidence:5},{cash:-1600,stress:12}),
 C('Try a repair you saw online','Your repair holds. Your partner calls you a wizard.','The pipe breaks again, this time behind the wall.','craft',{cash:-90,craft:9},{cash:-2900,stress:22})]),
S('familyfeud','adult','🍗','The roast dinner incident','Two relatives refuse to sit near each other. Someone has already labeled the table “neutral territory.”',[
 C('Have an honest conversation with both','They agree to behave for one evening. It is a Christmas miracle.','Dinner stays awkward, but nobody storms out. You count that as progress.','social',{alignment:10,happiness:9},{stress:6}),
 C('Seat them together anyway','After an hour they are arguing about the best way to cook potatoes. Progress?','One of them leaves before dessert. Everyone blames you.','confidence',{happiness:8},{stress:14,confidence:-7})]),
S('badinvestment','adult','📉','The hot tip','A coworker swears an app called Lunar Lettuce is about to make everybody rich. They have graphs. Awful graphs.',[
 C('Ask hard questions and decline','The company folds a month later. You have never enjoyed being boring so much.','It actually grows. You miss out, but your savings are safe.','smarts',{confidence:10},{confidence:-2}),
 C('Put serious money into it','The gamble pays off, and you spend a week being unbearable about it.','The stock collapses. Your savings take a nasty hit.','smarts',{cash:5000,stress:-5},{cash:-6800,stress:23})]),
S('inheritroom','adult','🗝️','Grandpa’s locked room','After a relative passes, you inherit the contents of a locked storage room. The door has three padlocks and a hand-painted warning: “BE POLITE.”',[
 C('Open it with family present','Inside is an enormous model railway and a letter explaining every tiny town.','The room contains boxes of mundane paperwork. At the bottom is a photo you have never seen.','smarts',{happiness:12,writing:7},{happiness:5,stress:6}),
 C('Sell the contents unopened','An antiques dealer pays generously. You wonder what was inside.','The buyer sends you a photo of a rare collector’s item worth far more than they paid.','social',{cash:3000,alignment:-5},{cash:250,stress:12})]),
S('bossretire','adult','💼','The boss leaves you the keys','Your boss announces retirement and asks whether you will take over the department. Everybody else is listening.',[
 C('Apply and show your work','You earn the promotion, plus a terrifying number of meetings.','The role goes to someone else. You negotiate training and another shot next year.','social',{reputation:12,confidence:8,flag:'bossSuccess'},{writing:5,stress:8}) ,
 C('Sabotage the other candidate','You get the role. Your new team knows how you got it.','The email trail leads straight back to you. You are written up.','coding',{reputation:-14,alignment:-25},{reputation:-28,alignment:-28,record:1})], 'job'),
S('localelection','adult','🗳️','The park is closing','The town council wants to pave over the little park where your kids learned to ride bikes.',[
 C('Organize a neighborhood campaign','Your petition passes and the park stays open. Someone names a bench after you.','The council votes against you, but the campaign builds a lasting community group.','social',{alignment:15,reputation:15,flag:'savedPark'},{alignment:12,social:9}),
 C('Take the construction company’s offer','You quietly pocket a consulting fee and avoid the meeting.','The deal becomes public. Your neighbors stop inviting you over.','social',{cash:2500,alignment:-22,reputation:-8},{cash:300,reputation:-28,alignment:-22})]),
S('oldfriendcalling','adult','☎️','The number you never deleted','A childhood friend calls out of the blue. They are stranded two towns over after their car broke down.',[
 C('Drive out and help','You spend four hours talking like no time passed.','Your own car breaks down on the way. You both end up at a diner waiting for help.','smarts',{bond:15,alignment:10},{cash:-230,bond:12,happiness:6}),
 C('Say you are busy','They find another ride. You never learn what they really wanted to say.','A mutual friend calls later. The stranded friend is hurt and angry.','social',{stress:-3,alignment:-7},{bond:-20,alignment:-11})]),
S('childschool','adult','📚','The call from the principal','Your child has been caught selling “official homework insurance” to classmates. They are surprisingly profitable.',[
 C('Make them repay everyone','The apology is rough, but they learn something. You keep a copy of the business plan.','They complain for weeks, then quietly start a legitimate tutoring club.','social',{bond:12,target:'kidId',alignment:9},{bond:-4,target:'kidId',alignment:10}),
 C('Ask for a share of the profits','Your kid calls you a business genius. Your partner disagrees.','The principal asks whether you are serious. You should not have said that.','social',{cash:120,alignment:-19},{reputation:-13,alignment:-21,bond:-10,target:'kidId'})], 'kid'),
S('workaccident','adult','⚠️','The missing safety guard','You notice a piece of machinery at work has been running without its safety guard. Your supervisor tells you to ignore it.',[
 C('Stop work and report the issue','A proper inspection finds a dangerous fault. Nobody gets hurt.','Your supervisor is furious, but the equipment is repaired before anyone uses it again.','smarts',{alignment:18,reputation:10},{alignment:16,stress:11}),
 C('Look the other way','Nothing happens this time. You regret not speaking up.','A coworker is injured. Investigators ask why nobody reported the problem.','confidence',{stress:8,alignment:-16},{reputation:-20,stress:22,alignment:-21})], 'job'),
S('forgotanniversary','adult','💐','The forgotten anniversary','Your partner walks into the kitchen carrying two movie tickets. You have completely forgotten what day it is.',[
 C('Admit it and plan something thoughtful','You cook dinner and turn the mistake into a new tradition.','They are hurt, but appreciate that you did not make excuses.','cooking',{bond:16,target:'partnerId',happiness:8},{bond:7,target:'partnerId',stress:6}),
 C('Pretend the tickets were your idea','Your partner smiles. You may have gotten away with this one.','They pull out the receipt with their name on it. Game over.','social',{bond:3,target:'partnerId',alignment:-8},{bond:-21,target:'partnerId',alignment:-9})], 'partner'),
S('petclinic','adult','🐕','The enormous vet bill','Your pet needs a procedure that will cost more than your last holiday.',[
 C('Pay and care for them','The treatment works and your pet comes home wearing a ridiculous cone.','Recovery takes weeks. You rearrange your schedule to make it work.','animals',{cash:-1100,happiness:9},{cash:-1800,stress:12,happiness:3}),
 C('Ask the local rescue for help','A rescue fund contributes toward treatment. You volunteer to repay the kindness.','The fundraiser falls short. You arrange an affordable payment plan.','social',{cash:-350,alignment:11},{cash:-850,stress:11,alignment:8})], 'pet'),
S('failedrestaurant','adult','🍳','The restaurant review','A newspaper critic arrives unannounced. Your chef drops a ladle and says “that is either a critic or a tax auditor.”',[
 C('Serve your best dish','The review praises your cooking and your very odd décor.','The food is great but the critic spends six paragraphs complaining about the music.','cooking',{cash:2400,reputation:12},{cash:500,stress:7}),
 C('Ask the critic for a five-star deal','They walk out and write a blistering column about attempted bribery.','The critic takes a photo of your note and your boss is called.','social',{reputation:-18,alignment:-23},{reputation:-24,alignment:-22,stress:15})], 'chef'),
S('suddenfame','adult','📺','The viral video','An old video of you falling into a wedding cake has gone viral. A talk show wants to interview you.',[
 C('Tell the embarrassing story','You win over the audience by laughing at yourself.','The host asks a deeply awkward follow-up and you blush through the entire segment.','social',{popularity:16,cash:700},{happiness:5,confidence:-4}),
 C('Invent a ridiculous heroic explanation','Your lie is so absurd it becomes a running joke on the show.','Someone posts the unedited video. Your legendary cake-rescue story falls apart.','theater',{popularity:19,alignment:-8},{reputation:-12,alignment:-9})]),
S('sickrelative','adult','🏥','The hospital waiting room','A close relative is sick. You have an important appointment the same day as their procedure.',[
 C('Reschedule and be with them','They squeeze your hand before the procedure and ask about the most boring part of your week.','You sit together for hours. Nothing you say fixes it, but they are glad you came.','social',{bond:16,target:'parentId',alignment:12},{stress:10,alignment:10}),
 C('Go to the appointment','The appointment goes well, and you call them afterward.','The call comes while you are driving home. You wish you had been there.','smarts',{cash:500,stress:6},{happiness:-15,stress:16})], 'parent'),
S('divorcepapers','adult','💔','Two mugs, one kitchen','The relationship has been tense for months. Your partner leaves two mugs on the table and says you need to talk.',[
 C('Make time to work on things','You begin seeing each other differently. It is slow but real.','You both decide that separating kindly is better than hurting each other.','social',{bond:16,target:'partnerId',happiness:7},{stress:12,bond:-15,target:'partnerId'}),
 C('Make the whole argument about money','You win the point. The conversation ends anyway.','Your partner walks out and stays with a friend.','smarts',{cash:200,alignment:-10,bond:-13,target:'partnerId'},{bond:-26,target:'partnerId',stress:17,alignment:-12})], 'partner'),
S('gala','adult','🎨','The art gala disaster','A wealthy donor mistakes your abstract sculpture for a coat rack. Four people have already hung jackets on it.',[
 C('Explain the work without embarrassing them','The donor buys the piece and laughs about the mistake.','They do not buy it, but an art teacher asks you to run a workshop.','art',{cash:2600,art:10},{art:8,reputation:6}),
 C('Put up a sign charging for coat storage','People actually pay. Your new installation is called “The Burden of Fashion.”','Security removes your sign and warns you not to turn the gallery into a laundromat.','social',{cash:400,popularity:9},{reputation:-6,stress:6})], 'artist'),
// SENIOR YEARS: new careers, stubborn rivalries, living arrangements, legacy and mishaps.
S('retirebird','senior','🐦','The bird at the window','Every morning a crow delivers one shiny object to your windowsill. Today it delivers a wedding ring.',[
 C('Find the owner','A neighbor recognizes it immediately and bursts into tears of relief.','After three days of detective work, you learn it belongs to a retired magician.','smarts',{alignment:15,happiness:13},{writing:7,confidence:5}),
 C('Keep the crow’s gifts','The crow decides you are friends and starts bringing bottle caps by the dozen.','The neighbor spots the ring through your window. An awkward conversation follows.','animals',{animals:8,happiness:7},{reputation:-11,alignment:-9})]),
S('retirehomebingo','senior','🎱','The bingo conspiracy','The retirement home’s bingo champion has won seven weeks running. They always sit beside the same suspicious plant.',[
 C('Investigate the plant','You find a hidden spare bingo card and expose the harmless prank.','The plant is just a plant. The champion wins again and buys you cake.','smarts',{reputation:8,social:8},{stress:4,happiness:6}),
 C('Team up with the champion','You win a coupon for the salon and a lifelong rival.','Your partner accuses you of missing the last number. A small feud begins.','social',{happiness:11,confidence:8},{stress:8})], 'retirement'),
S('retirehomerevolt','senior','🥔','The mashed potato uprising','The retirement home has served mashed potatoes eleven days in a row. A resident named Gloria announces a revolution.',[
 C('Help Gloria organize a menu vote','The kitchen adds taco night. Gloria names you Minister of Gravy.','Management refuses, but the residents form a cooking club anyway.','social',{happiness:15,alignment:10,flag:'potatoRevolt'},{social:7,alignment:8}),
 C('Start a food fight','The dining hall erupts. The staff call it “the Incident.” Gloria calls it victory.','You slip while dodging a dinner roll. The staff ban peas for a month.','sports',{popularity:17,stress:-7},{injury:'sprain',stress:9})], 'retirement'),
S('seniorinfluencer','senior','📱','Grandma goes viral','Your first video, a two-minute review of disappointing teapots, gets fifty thousand views.',[
 C('Start a weekly review show','Your sharp wit earns an audience. The sponsors start calling.','A new microphone arrives. You accidentally broadcast yourself arguing with the vacuum cleaner.','media',{cash:1800,popularity:17,media:8},{media:9,happiness:8}),
 C('Announce retirement from the internet','Your fans throw a mock farewell party and send hundreds of postcards.','Nobody notices the goodbye video until your granddaughter texts you a week later.','confidence',{happiness:11,stress:-8},{happiness:5,stress:-5})]),
S('seniorreunion','senior','📸','The fifty-year reunion','At your school reunion, someone has displayed your teenage yearbook photo above the punch bowl.',[
 C('Own the terrible haircut','Everyone brings up memories you had completely forgotten.','You laugh with an old rival and finally make peace.','social',{happiness:12,bond:9},{alignment:8,stress:-6}),
 C('Claim the haircut was ahead of its time','Three people agree. One asks if you were in a rock band.','The old yearbook editor produces proof you once called it a “hair emergency.”','theater',{popularity:8},{confidence:-5,happiness:7})]),
S('retirementbus','senior','🚌','The wrong bus','You board a retirement excursion to a botanical garden. Two hours later you arrive at a monster truck rally.',[
 C('Stay for the show','You have the time of your life and buy a ridiculous foam tire hat.','The noise is too much, but the group finds a quiet diner nearby.','health',{happiness:17},{stress:-5,happiness:8}),
 C('Lead an expedition to find the garden','Your map reading saves the outing. Everyone brings home tiny plants.','You end up at a cheese factory instead. Somehow there are fewer complaints.','smarts',{confidence:12,happiness:10},{happiness:14,stress:5})]),
S('oldrivalcake','senior','🍰','The rival and the cake','Your oldest rival arrives at the community bake sale with a cake shaped exactly like your face.',[
 C('Buy a slice and laugh','They laugh too. By the end of the day you are exchanging recipes.','They charge you double. It is still a delicious cake.','social',{happiness:15,alignment:8},{cash:-30,stress:3}),
 C('Enter a cake of your own','Your dragon-shaped cake wins first prize. Your rival wants a rematch.','Your frosting melts on the table. The rival helps you clean up.','cooking',{cash:150,cooking:11},{cooking:6,happiness:7})]),
S('seniorgrandkid','senior','🎲','The dungeon master grandma','A grandchild asks you to run a fantasy role-playing game. They have already drawn a dragon on the tablecloth.',[
 C('Invent a dungeon with a twist','The children spend three hours trying to befriend the villain. You name him Mr. Pickle.','They ignore your carefully drawn map and open a bakery in the starting village.','tabletop',{tabletop:12,bond:15,target:'kidId'},{writing:8,happiness:11}),
 C('Let the grandchild run the adventure','They surprise you with a brilliant story and declare you their favorite player.','Your character gets defeated by a goose on the first turn. You frame the character sheet.','social',{happiness:15},{tabletop:6,happiness:12})], 'kid'),
S('seniorgarden','senior','🌻','The cucumber championship','The county fair announcer says your cucumber is “an astonishing and vaguely alarming specimen.”',[
 C('Enter the competition','You win the blue ribbon and become a gardening celebrity.','A twelve-year-old beats you with an enormous pumpkin. You congratulate them anyway.','gardening',{cash:250,gardening:12},{gardening:7,alignment:8}),
 C('Donate the vegetables','The food pantry sends a grateful letter. A local newspaper takes your picture.','The pantry has too many cucumbers. They turn yours into pickles for the winter.','social',{alignment:13,happiness:11},{alignment:10,gardening:6})]),
S('seniormotor','senior','🏎️','The mobility scooter race','A group at the retirement home has organized a low-speed mobility scooter race around the garden. Someone has painted flames on theirs.',[
 C('Enter carefully','You finish second and receive a handmade trophy.','Your battery runs low. You push the scooter over the line to loud applause.','sports',{happiness:15,sports:5},{health:-3,happiness:8}),
 C('Cheat with a shortcut','You technically win. Everyone knows why.','The shortcut takes you into the sprinkler system. You return soaking wet.','smarts',{popularity:9,alignment:-12},{alignment:-11,happiness:7})], 'retirement'),
S('lostletter','senior','✉️','A letter from 1979','A demolition crew finds a box of undelivered letters in a wall. One is addressed to you, forty-seven years ago.',[
 C('Open it with the family','It is a note from an old friend, asking you never to forget the summer you met.','It is an unpaid library fine. Your grandchildren have a field day with it.','writing',{happiness:14,bond:8},{happiness:9,stress:-4}),
 C('Track down the sender','You meet at a café and talk until closing.','The sender has passed away. Their family shares photographs you never knew existed.','social',{happiness:15},{happiness:-6,writing:9})]),
S('seniorpaint','senior','🎨','The gallery calls','A local gallery offers to display the paintings you have been making for years. The curator has a very serious scarf.',[
 C('Show your most personal painting','The exhibition sells out. A visitor tells you it reminds them of their father.','You do not sell much, but the opening draws a crowd of people who genuinely care.','art',{cash:2300,art:10,happiness:12},{popularity:7,art:8}),
 C('Paint something outrageously weird','Your nine-foot portrait of a smug pigeon becomes the talk of the town.','The gallery rejects it. A nearby coffee shop begs to display it.','art',{cash:1800,popularity:14},{cash:300,art:6})]),
S('seniordog','senior','🐶','The old dog at the shelter','The shelter asks if you could foster a very elderly dog named Captain Waffles. He has a medical chart thicker than a cookbook.',[
 C('Welcome him home','He sleeps beside your chair and becomes your quiet companion.','The foster arrangement is expensive but worth it. He learns where the treats are kept in one day.','animals',{happiness:14,animals:8,flag:'fosterWaffles',petName:'Captain Waffles'},{cash:-350,happiness:10}),
 C('Help find another home','Your flyer brings in a perfect adopter. They send you updates every month.','It takes weeks. Then a kind family finally takes him in.','social',{alignment:15,social:8},{alignment:11,stress:5})]),
S('oldstories','senior','📚','The stories nobody believed','A young reporter asks to interview you about the strangest thing that ever happened in your town.',[
 C('Tell the real story','Your interview becomes a beloved local article. Even the small details matter to people.','The reporter edits it down to one paragraph about a mysterious cabbage.','writing',{cash:250,writing:10,happiness:10},{writing:8,popularity:5}),
 C('Make up something absolutely outrageous','They print your tale of a mayor being replaced by three raccoons. The town laughs for months.','The reporter checks the facts. Your story falls apart after the second question.','theater',{popularity:15,alignment:-6},{reputation:-10,alignment:-8})]),
S('seniorvolunteer','senior','🥣','The kitchen on Christmas','The community kitchen needs someone to serve meals on a holiday. You were planning to stay home.',[
 C('Go and bring a homemade dish','You meet a new friend named Hattie who asks for your recipe.','The soup turns out too salty. Nobody minds because you stay and help clean.','cooking',{alignment:14,happiness:12,cooking:6},{alignment:12,happiness:8}),
 C('Stay home and call an old friend','Your conversation lasts all evening. It may be the best holiday in years.','They cannot answer, but leave a kind voice message the next morning.','social',{bond:11,stress:-7},{happiness:4,stress:-3})]),
S('seniorillness','senior','🩺','The stubborn cough','You have been feeling worn down for weeks. Your neighbor says you sound like their lawnmower.',[
 C('See a doctor and rest','It is a treatable infection. A course of medicine has you feeling better.','You need several weeks to recover. Your friends rotate visits and soup deliveries.','smarts',{health:13,stress:-6},{health:5,cash:-350,stress:6}),
 C('Ignore it and keep your schedule','You seem to shake it off and make it to the picnic.','The cough gets worse. You finally seek care after an awful week.','health',{happiness:6},{health:-19,injury:'sprain',stress:12})]),
S('retirementtheft','senior','🕵️','The missing bingo trophies','Someone keeps stealing the retirement home’s tiny plastic trophies. Gloria points at you without evidence.',[
 C('Set a harmless detective trap','You catch the night custodian moving them to clean the shelf. Case closed.','The culprit is a toddler visiting his grandmother. He returns them with a sticky apology.','smarts',{reputation:11,social:8},{happiness:9,social:4}),
 C('Accuse your bingo rival','The accusation starts a hallway feud that lasts six months.','Gloria produces proof that you borrowed the trophies for a photograph.','social',{popularity:8,alignment:-11},{reputation:-13,alignment:-10})], 'retirement'),
S('seniormeteor','senior','☄️','The night the sky blinked','You see a bright streak over the backyard. The next morning a warm black stone is lying beside the birdbath.',[
 C('Call the local museum','Scientists confirm it is a tiny meteorite. Your name ends up in a museum exhibit.','It is industrial slag. The geologist still gives you a fascinating tour.','science',{science:11,popularity:12,flag:'meteorite'},{science:7,happiness:7}),
 C('Keep it as a lucky charm','The stone becomes your prized conversation piece. Your grandchildren call it Moon Nugget.','A neighbor tells you it fell off a passing truck. You keep it anyway.','confidence',{happiness:12},{happiness:6})]),
S('lastadventure','senior','🎈','One ridiculous wish','A local charity offers to grant one small wish to a senior citizen. You have to choose by Friday.',[
 C('Take a balloon ride','You watch the town become a patchwork of roofs and gardens below.','The wind cancels the flight. The pilot invites you to the airfield for breakfast instead.','confidence',{happiness:18,confidence:12},{happiness:8,stress:-8}),
 C('Host a massive reunion dinner','Friends come from five states. You all tell stories until midnight.','Only a few people can come. They stay for hours, and that is enough.','social',{bond:16,happiness:19},{happiness:12,stress:-4})]),
S('seniorharmlessprank','senior','🎭','The statue that waved','The town wants to unveil a statue of its founder. You know someone who can rig its arm to wave.',[
 C('Ask permission for the joke','The unveiling is a hit. The mayor calls it a “valuable civic experience.”','They say no, but ask you to narrate the ceremony instead.','craft',{popularity:12,alignment:6},{writing:6,alignment:5}),
 C('Rig it without telling anybody','The statue waves on live television. The mayor nearly drops the microphone.','The mechanism jams loudly during the speech. You confess and help repair it.','craft',{popularity:19,alignment:-8},{cash:-400,alignment:-10,stress:6})]),
S('oldphone','senior','☎️','The wrong number that kept calling','Every Thursday a stranger calls and asks for “Doris.” Your name is not Doris.',[
 C('Ask who they are actually looking for','They are dialing their sister’s old number. You help them reconnect.','They are trying to reach a bakery that closed in 1988. You share recipes anyway.','social',{alignment:11,happiness:10},{happiness:7,social:6}),
 C('Become Doris for one call','You accidentally hear an elaborate family argument about a stolen lawn gnome.','The caller is Doris herself, who is very confused by your performance.','theater',{happiness:12,alignment:-4},{confidence:-6,happiness:7})])
];
// Recurring three-part stories. The first choice changes the description of later chapters.
scenes.push(
 S('lossattic','context','🧳','The box in the attic','After a recent loss, a relative asks you to sort through a cardboard box of things nobody knows what to do with.',[
  C('Look through it slowly','You find a postcard with a joke written on the back. You remember exactly how they used to laugh.','Most of it is old paperwork. At the bottom is a photograph nobody in the family has seen.','writing',{happiness:6,stress:-9},{writing:6,happiness:-4}),
  C('Give the whole box away','The charity thanks you. You keep one faded photograph in your wallet.','A cousin asks where the box went. You realize you should have asked everyone first.','social',{alignment:9,stress:-5},{bond:-12,target:'siblingId',stress:9})], 'recentLoss'),
 S('lostrecipe','context','🍪','The recipe with no measurements','You find a handwritten recipe from someone the family lost. The only instruction says “enough cinnamon.”',[
  C('Try to bake it','The kitchen smells like old holidays. Everyone gets quiet over the first bite.','You add too much cinnamon and set off the smoke alarm. The family laughs through tears.','cooking',{cooking:9,happiness:8},{cooking:5,happiness:6}),
  C('Ask everyone for their memories','Three relatives have three completely different versions. You write them all down.','The family argues about whether there were ever raisins in the recipe. Nobody agrees.','social',{writing:8,bond:7},{stress:5,writing:5})], 'recentLoss'),
 S('oldvoicemail','context','☎️','The voice you forgot you kept','Your phone offers to delete an old voicemail from somebody who is gone. The message begins with them laughing at their own joke.',[
  C('Save it somewhere safe','You make a copy and share it with the family. Somebody replies with another old recording.','The file will not export, so you write down the words before trying again.','coding',{happiness:11,stress:-5},{writing:7,stress:6}),
  C('Delete it and move forward','You do not feel guilty. You still remember the laugh.','You regret the decision that evening. A family member tells you a new story about them.','confidence',{stress:-8},{happiness:-7,stress:6})], 'recentLoss'),
 S('oldfriendfuneral','context','🌼','The unexpected reunion','You go to a memorial and see three old friends standing beside a table of terrible homemade sandwiches.',[
  C('Sit with them and talk','You tell funny stories for hours. You leave feeling sad and strangely grateful.','You cannot find the words. Your friends sit beside you anyway.','social',{happiness:8,bond:9},{stress:-5,happiness:3}),
  C('Sneak out and go for a walk','You end up on a familiar street and remember a summer you had almost forgotten.','A friend follows to check on you. You walk together without saying much.','confidence',{stress:-10},{bond:8,stress:-4})], 'recentLoss')
);
const arcs=[
 {id:'schoolnewspaper',period:'teen',icon:'📰',start:[12,15],gap:[1,2],parts:[
  ['The newspaper tip','Someone slips a note into your locker alleging that the school council is spending fundraiser money on a secret mascot costume.',[
   C('Investigate quietly','The receipts point to the student council president. You keep copies.','The source goes silent, but you still have an invoice with the word “GATOR.”','writing',{writing:9,flag:'paperTruth'},{smarts:5}),
   C('Publish the rumor immediately','The story goes viral. Everyone wants to know who sent the tip.','The council denies it and threatens to shut down your school newspaper.','media',{popularity:11,alignment:-9},{reputation:-11,alignment:-10})]],
  ['The mascot appears','A giant alligator costume turns up in the auditorium. Someone left a cash envelope inside.',[
   C('Ask for an audit','The principal starts an investigation, and your paper runs the story.','Your request is denied, but a teacher offers help with the records.','smarts',{reputation:10,grades:7},{writing:7}),
   C('Wear the costume to confront everyone','You become a school meme known as the Alligator of Justice.','You trip on the stairs and the audience boos your dramatic entrance.','theater',{popularity:16},{injury:'sprain',stress:9})]],
  ['The truth in print','Graduation week. You finally learn where the missing money went.',[
   C('Publish the complete story','The money had been set aside for a surprise accessible playground. You print the correction and the full story.','The money was genuinely mismanaged. Your reporting prompts new rules.','writing',{reputation:13,alignment:14},{reputation:14,alignment:13}),
   C('Keep the secret for leverage','The council offers you a role in next year’s school leadership.','Your editor finds out you withheld the truth and removes your byline.','social',{popularity:10,alignment:-18},{reputation:-15,alignment:-18})]]]},
 {id:'nightshift',period:'young',icon:'🌙',start:[19,27],gap:[1,3],parts:[
  ['The night-shift offer','An eccentric inventor named Len offers you weekend work cataloging unmarked boxes in his workshop.',[
   C('Take careful notes','You find dozens of unfinished inventions, including a toaster that applauds.','You discover Len’s notebook is full of diagrams but no explanations.','smarts',{cash:350,craft:7},{cash:200,writing:6}),
   C('Try turning everything on','The workshop becomes a symphony of beeps. Len is delighted and furious.','A prototype floods the floor with harmless purple soap bubbles.','craft',{craft:10,stress:4},{cash:-110,stress:11})]],
  ['A prototype disappears','Len’s best invention, a pocket-sized translator, goes missing before a public demonstration.',[
   C('Search the inventory','You find the translator in a box labeled “VERY BORING SPOONS.”','You trace a delivery slip to a mechanic across town.','smarts',{cash:650,smarts:8},{coding:7,stress:7}),
   C('Accuse Len’s apprentice','The apprentice resigns. Len blames you for rushing to judgment.','You are wrong. The apprentice produces video evidence of the real thief.','social',{alignment:-13,bond:-12},{alignment:-18,reputation:-11})]],
  ['The investor arrives','A famous inventor wants to buy Len’s entire workshop. Len asks if you should sell.',[
   C('Help him negotiate fair terms','Len keeps the workshop, hires young apprentices, and gives you a share of the success.','The deal falls through, but you secure a grant to keep the workshop open.','social',{cash:2800,craft:12},{cash:900,reputation:8}),
   C('Sell your inside knowledge','You earn a quick payment. Len never speaks to you again.','The investor refuses and tells Len you tried to betray him.','media',{cash:1400,alignment:-23},{reputation:-20,alignment:-22})]]]},
 {id:'neighborhood','period':'adult',icon:'🏘️',start:[30,54],gap:[2,4],parts:[
  ['The strange house','A boarded-up house on your street begins receiving deliveries of dozens of ceramic frogs.',[
   C('Welcome the mysterious neighbor','You meet Celia, a retired artist making a giant community sculpture.','Nobody answers. You leave a friendly note and receive a frog in return.','social',{happiness:10,art:6},{happiness:7}),
   C('Report suspicious activity','The police find a harmless sculpture studio. Your neighbors laugh.','The city inspector issues a warning about outdoor storage. Celia is angry with you.','smarts',{alignment:-7,stress:6},{alignment:-11,reputation:-6})]],
  ['The frog parade','Celia asks you to help bring her sculptures through town in a parade. The council is skeptical.',[
   C('Get the permits and volunteers','Hundreds turn out. A marching band adopts a frog as mascot.','The permit is denied. You organize a small exhibition in the park instead.','social',{reputation:10,art:7},{social:6,happiness:7}),
   C('Run the parade anyway','The crowd loves it, until a giant papier-mâché frog blocks traffic.','The police politely stop the parade. You pay a permit fine.','confidence',{popularity:15,cash:-200},{cash:-550,stress:12})]],
  ['The last delivery','Celia receives an offer to move her studio abroad and asks what to do with the unfinished giant frog.',[
   C('Build it as a neighborhood project','The completed frog becomes a landmark and Celia sends postcards for years.','The frog breaks before unveiling. Everyone repairs it together.','craft',{art:12,reputation:12},{craft:9,happiness:8}),
   C('Sell the plans to a collector','You earn a fee and Celia finds out after signing the paperwork.','The collector backs out when they realize the frog is four meters tall.','social',{cash:1700,alignment:-14},{stress:12,alignment:-12})]]]},
 {id:'oldradio',period:'senior',icon:'📻',start:[66,89],gap:[1,3],parts:[
  ['The mystery radio','You buy a dusty old radio at a yard sale. Every evening it picks up a station announcing programs from fifty years ago.',[
   C('Record the broadcasts','You hear your hometown mentioned and begin keeping a notebook.','The station vanishes whenever you invite anyone to listen.','science',{science:9,writing:7},{writing:7}),
   C('Sell it as a ghost radio','A collector pays well and asks for the broadcast schedule.','The buyer returns it two days later. It only picks up weather reports.','social',{cash:750},{cash:95,stress:7})]],
  ['The announcer’s name','A broadcast names a long-closed dance hall. You discover the announcer has the same surname as an old friend.',[
   C('Visit the local archives','A librarian finds the station logs and a forgotten photograph.','You trace the station call letters to a warehouse outside town.','smarts',{writing:10,happiness:7},{science:8}),
   C('Call in live','To your astonishment, someone answers in a voice that sounds decades old.','The voice on the line belongs to a very bored radio hobbyist.','media',{confidence:12},{happiness:8})]],
  ['One last broadcast','The station transmits its final program tonight. There is a chance to send a message on air.',[
   C('Thank the people you have loved','You hear a familiar voice say your name. Whether it was real hardly matters.','The radio goes silent before your message ends. You finish it anyway.','social',{happiness:17,stress:-12},{happiness:12}),
   C('Reveal the whole mystery on a podcast','A documentary producer gets interested. Your story travels around the world.','The evidence remains inconclusive. Your listeners are delighted by the mystery.','media',{cash:1600,popularity:14},{media:9,happiness:9})]]]},
 {id:'secondcareer',period:'senior',icon:'🎬',start:[64,90],gap:[1,3],parts:[
  ['The accidental audition','A casting director mistakes you for a famous retired actor and invites you to read for a movie.',[
   C('Audition under your own name','You land a small part as a grumpy lighthouse keeper.','You lose the role but the director calls you “unforgettably strange.”','theater',{theater:10,cash:600},{theater:8,confidence:5}),
   C('Pretend to be the famous actor','You get through the audition. Now they want to see your filmography.','The director recognizes the lie immediately. They are not amused.','social',{alignment:-15,cash:300},{reputation:-12,alignment:-16})]],
  ['The movie set','Your character has one line: “That is not my penguin.” You have been rehearsing it for weeks.',[
   C('Deliver it with conviction','The crew erupts in laughter. The director gives you a second scene.','You flub the line six times. The penguin puppet steals the scene.','theater',{cash:1250,theater:12},{theater:8,happiness:7}),
   C('Rewrite it as a speech','The director lets you improvise and the speech becomes a trailer moment.','The director yells “CUT” before you finish the second sentence.','writing',{writing:10,popularity:11},{stress:9})]],
  ['Premiere night','Your movie is premiering. The theater has a red carpet about the length of a bath mat.',[
   C('Bring your family','They cheer at your scene. You all stay for the credits.','Your scene was cut. Your family throws a celebratory dinner anyway.','social',{happiness:20,reputation:8},{happiness:13}),
   C('Steal the spotlight','You arrive in a homemade penguin suit and dominate the interviews.','The costume zipper breaks. A journalist catches the whole moment on film.','theater',{popularity:16,cash:1000},{happiness:9,confidence:-5})]]]}];
const jobs=[
 ['courtclerk','Court Clerk',49000,34,'writing','Clerk of the court. The files are stacked like an architectural statement.'],
 ['mailcarrier','Mail Carrier',48000,22,'sports','Deliver letters, meet every dog on the block.'],
 ['plumber','Plumber',69000,36,'craft','Somebody has to explain why the kitchen is a lake.'],
 ['busdriver','Bus Driver',50000,25,'social','Keep thirty people on time. Good luck.'],
 ['flightscheduler','Flight Dispatcher',77000,59,'smarts','Solve the puzzle of getting everybody into the air safely.'],
 ['librarypage','Library Assistant',35000,15,'writing','Shelve the books and discover what people read.'],
 ['signpainter','Sign Painter',52000,40,'art','Letter storefronts. Catch spelling mistakes before the paint dries.'],
 ['aquarist','Aquarium Keeper',54000,42,'animals','Feed sharks and negotiate with dramatic penguins.'],
 ['conductor','Train Conductor',76000,48,'social','Tickets, timetables and one very long whistle.'],
 ['comedian','Stand-Up Comic',37000,35,'social','Bad nights. Great nights. A microphone that smells suspicious.'],
 ['stuntdouble','Stunt Performer',78000,72,'sports','Practice the safe version a hundred times. Then do it once on camera.'],
 ['voiceactor','Voice Actor',62000,50,'theater','Get paid to make goblin sounds in a padded room.'],
 ['miniaturist','Miniature Maker',45000,39,'craft','Tiny castles. Tiny dragons. Magnificent eye strain.'],
 ['museumrestorer','Museum Conservator',65000,68,'art','Restore a centuries-old painting without touching the moustache.'],
 ['meteorologist','Meteorologist',89000,77,'science','Predict the weather. Get blamed for the picnic anyway.'],
 ['toyinventor','Toy Designer',71000,59,'craft','Build ridiculous prototypes for very serious children.'],
 ['paleontologist','Paleontologist',85000,74,'science','Dig up dinosaurs and write polite arguments about them.'],
 ['puppetmaker','Puppet Maker',46000,40,'art','Give a felt monster a personality and a tax return.'],
 ['escapeartist','Escape Artist',61000,61,'theater','Perform staged escapes without actual dangerous shortcuts.'],
 ['themepark','Theme Park Designer',87000,73,'craft','Design rides people talk about for years.'],
 ['dogtrainer','Dog Trainer',51000,45,'animals','Teach dogs to stay. Persuade their humans to listen.'],
 ['wildlifephotog','Wildlife Photographer',54000,53,'art','Wake before dawn. Wait eight hours for a bird to blink.'],
 ['archivist','City Archivist',61000,58,'writing','Find the good stories hiding in the dusty boxes.'],
 ['midwife','Birth Support Specialist',68000,65,'social','Care for families on very big days.'],
 ['boatcaptain','Ferry Captain',83000,70,'sports','Get people across the water without losing their luggage.'],
 ['chocolatier','Chocolatier',59000,48,'cooking','Shape tiny masterpieces. Resist eating inventory.'],
 ['triviahost','Trivia Host',32000,24,'tabletop','Ask people questions and survive their complaints.'],
 ['videogametester','Game QA Tester',54000,44,'gaming','Find the bug nobody else can reproduce.'],
 ['esportscoach','Esports Coach',66000,66,'gaming','Teach strategy, teamwork, and when to take a break.'],
 ['treasurehunter','Historical Treasure Hunter',47000,59,'science','Use archives and maps to recover lost historical objects legally.'],
 ['fossilartist','Dinosaur Exhibit Sculptor',58000,58,'art','Give a prehistoric creature the correct number of toes.'],
 ['festivalrunner','Festival Organizer',69000,55,'social','Keep a crowd happy and the portable toilets standing.'],
 ['pinballrepair','Pinball Repair Technician',61000,57,'craft','One bent spring away from arcade glory.'],
 ['bookbinder','Bookbinder',42000,41,'craft','Bring battered books back from the dead.'],
 ['mysteryauthor','Mystery Novelist',52000,62,'writing','Murder mysteries without committing any actual crimes.'],
 ['retirementactivities','Retirement Home Activities Director',54000,42,'social','Bingo, karaoke, and the occasional rebellion.'],
 ['cruiseentertainer','Cruise Ship Entertainer',55000,51,'music','Sing to strangers while the ocean moves your stage.'],
 ['balloonpilot','Hot Air Balloon Pilot',62000,73,'sports','Make the sunrise someone’s favorite memory.'],
 ['crypticcrossword','Crossword Constructor',45000,63,'writing','Baffling clues for people who enjoy being baffled.']
].map(([id,title,pay,req,skill,desc])=>({id,title,pay,req,skill,desc}));
const illnesses=[
 {id:'cold',name:'a nasty cold',years:1,weight:12,harm:6,cost:80,min:10},
 {id:'flu',name:'the flu',years:1,weight:9,harm:13,cost:210,min:10},
 {id:'migraine',name:'recurring migraines',years:2,weight:7,harm:7,cost:280,min:12},
 {id:'sprained_back',name:'a strained back',years:2,weight:7,harm:12,cost:360,min:28},
 {id:'pneumonia',name:'pneumonia',years:2,weight:4,harm:20,cost:920,min:35},
 {id:'arthritis',name:'arthritis',years:4,weight:7,harm:6,cost:320,min:52},
 {id:'diabetes',name:'type 2 diabetes',years:6,weight:3,harm:9,cost:780,min:35},
 {id:'heart',name:'a heart condition',years:6,weight:2,harm:14,cost:1200,min:57},
 {id:'asthma',name:'asthma symptoms',years:4,weight:6,harm:6,cost:400,min:10},
 {id:'cataracts',name:'cataracts',years:4,weight:5,harm:5,cost:700,min:66},
 {id:'stomach',name:'a stomach bug',years:1,weight:8,harm:9,cost:90,min:10}
];
const homes=[
 {id:'own',title:'Stay in your own home',upfront:0,yearly:0,quality:2,desc:'Your own kitchen, your own rules, and your suspiciously large junk drawer.'},
 {id:'maple',title:'Maple Commons',upfront:1000,yearly:9000,quality:3,desc:'Community gardens, a small library, competitive card games.'},
 {id:'golden',title:'Golden Hour Lodge',upfront:3600,yearly:17000,quality:4,desc:'Assisted support, movie nights, and a surprisingly good baker.'},
 {id:'luxury',title:'The Grand Peacock',upfront:12000,yearly:32000,quality:5,desc:'Fancy dinners, koi pond, and the suspiciously political bingo league.'}
];
return {scenes,arcs,jobs,illnesses,homes};
})();