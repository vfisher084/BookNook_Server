const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
//const path = require("path");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


app.get("/books", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

//app.use('/images', express.static(path.join(__dirname, 'images')));

let books = [
    {
        "_id": 1, 
        "isbn": 9781649374042,
        "title": "Fourth Wing",
        "author": "Rebecca Yarros",
        "description": "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general — also known as her tough-as-talons mother — has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.\n But when you're smaller than everyone else and your body is brittle, death is only a heartbeat away... because dragons don't bond to \"fragile\" humans. They incinerate them.\n With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother's daughter — like Xaden Riorson, the most powerful and ruthless windleader in the Riders Quadrant.\n She'll need every edge her wits can give her just to see the next sunrise.\n Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret.\n Friends, enemies, lovers. Everyone at Basgiath War College has an agenda — because once you enter, there are ony two ways out: graduate or die (rebeccayarros.com).",
        "image": "images/fourthwing2.jpg",
        "price": "29.99",
        "format": ["Hardcover", " Paperback", " e-Book"],
        "genre": ["Romance", "Fantasy"],
        "category": "Fiction",
        "year": "2023",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.5",
        "quantity": 30
    },
    {
        "_id": 2,
        "isbn": 9780063415805,
        "title": "When the Moon Hatched",
        "author": "Sarah A. Parker",
        "description": "The Creators did not expect their beloved dragons to sail skyward upon their end. To curl into balls just beyond gravity's grip, littering the sky with tombstones. With moons.\nThey certainly did not expect them to fall.\nAs a valued Elding Blade of the rebellion group Fíur du Ath, Raeve's job is to kill. To complete orders and never get caught. When a renowned bounty hunter is employed by The Crown to capture a member of the Ath, Raeve's world is turned upside down. Blood spills, hearts break, and Raeve finds herself at the mercy of the Guild of Nobles—a group of dual-beaded elementals who intend to turn her into a political statement. Only death will set her free.\nCrushed beneath a mourning weight, Kaan Vaegor took the head of a king and donned his melted crown. Now on a tireless quest to assuage the never-ebbing ache in his chest, his hunt for a moonshard lures him into the belly of Gore's notorious prison where he stumbles upon something that rips apart his perception of reality. A shackled miracle with eyes full of rage and blood on her hands.\nThe echo of the past sings louder than the Creators themselves, and even Raeve can't ignore the truths blaring at her from a warmer, happier time. However. There's more to this song than meets the eye, and some truths... They're too poisonous to swallow (sarahparker.net).",
        "image": "images/wtmh2.jpg",
        "price": "19.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Romance", " Fantasy"],
        "category": "Fiction",
        "year": "2024",
        "reviews": [
            "\"Great book!\"",
            "\"I loved it!\"",
            "\"I couldn't put it down!\""
        ],
        "rating": "4",
        "quantity": 16
    },
    {
        "_id": 3,
        "isbn": 9781250192196,
        "title": "The Hazel Wood",
        "author": "Melissa Albert",
        "description": "Seventeen-year-old Alice and her mother have spent most of Alice's life on the road, always a step ahead of the uncanny bad luck biting at their heels. But when Alice's grandmother, the reclusive author of a cult-classic book of pitch-dark fairy tales, dies alone on her estate, the Hazel Wood, Alice learns how bad her luck can really get: her mother is stolen away-by a figure who claims to come from the Hinterland, the cruel supernatural world where her grandmother's stories are set. Alice's only lead is the message her mother left behind: \"Stay away from the Hazel Wood.\"\nAlice has long steered clear of her grandmother's cultish fans. But now she has no choice but to ally with classmate Ellery Finch, a Hinterland superfan who may have his own reasons for wanting to help her. To retrieve her mother, Alice must venture first to the Hazel Wood, then into the world where her grandmother's tales began―and where she might find out how her own story went so wrong (goodreads.com).",
        "image": "images/thehazelwood2.jpg",
        "price": "14.99",
        "format": ["Hardcover", " Paperback", " e-Book"],
        "genre": [" Fantasy", " Mystery"],
        "category": "Fiction",
        "year": "2018",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4", 
        "quantity": 37
    },
    {
        "_id": 4,
        "isbn": 9781609454845,
        "title": "A Winter's Promise",
        "author": "Christelle Dabos",
        "description": "Long ago, following a cataclysm called \"The Rupture,\" the world was shattered into many floating celestial islands. Known now as Arks, each has developed in distinct ways; each seems to possess its own unique relationship to time, such that nowadays vastly different worlds exist, together but apart. And over all of the Arks the spirit of an omnipotent ancestor abides.\nOphelia lives on Anima, an ark where objects have souls. Beneath her worn scarf and thick glasses, the young girl hides the ability to read and communicate with the souls of objects, and the power to travel through mirrors. Her peaceful existence on the Ark of Anima is disrupted when she is promised in marriage to Thorn, from the powerful Dragon clan. Ophelia must leave her family and follow her fiancée to the floating capital on the distant Ark of the Pole. Why has she been chosen? Why must she hide her true identity? Though she doesn't know it yet, she has become a pawn in a deadly plot (goodreads.com).",
        "image": "images/awp2.jpg",
        "price": "12.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Fantasy", "Sci-Fi"],
        "category": "Fiction",
        "year": "2013",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.3",
        "quantity": 22
    },
    {
        "_id": 5,
        "isbn": 9780349132600,
        "title": "The Housemaid's Secret",
        "author": "Freida McFadden",
        "description": "It's hard to find an employer who doesn't ask too many questions about my past. So I thank my lucky stars that the Garricks miraculously give me a job, cleaning their stunning penthouse with views across the city and preparing fancy meals in their shiny kitchen. I can work here for a while, stay quiet until I get what I want. It's almost perfect. But I still haven't met Mrs Garrick, or seen inside the guest bedroom. I'm sure I hear her crying. I notice spots of blood around the neck of her white nightgowns when I'm doing laundry. And one day I can't help but knock on the door. When it gently swings open, what I see inside changes everything...\nThat's when I make a promise. After all, I've done this before. I can protect Mrs. Garrick while keeping my own secrets locked up safe. Douglas Garrick has done wrong. He is going to pay. It's simply a question of how far I'm willing to go... (goodreads.com)",
        "image": "images/housemaid2.jpg",
        "price": "13.99",
        "format": ["Paperback"],
        "genre": [" Thriller", " Mystery"],
        "category": "Fiction",
        "year": "2023",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.2",
        "quantity": 13
    },
    {
        "_id": 6,
        "isbn": 9780590254762,
        "title": "The Lion, the Witch and the Wardrobe",
        "author": "C.S. Lewis",
        "description": "They open a door and enter a world NARNIA...the land beyond the wardrobe, the secret country known only to Peter, Susan, Edmund, and Lucy...the place where the adventure begins. Lucy is the first to find the secret of the wardrobe in the professor's mysterious old house. At first, no one believes her when she tells of her adventures in the land of Narnia. But soon Edmund and then Peter and Susan discover the Magic and meet Aslan, the Great Lion, for themselves. In the blink of an eye, their lives are changed forever (goodreads.com).",
        "image": "images/narnia2.jpg",
        "price": "10.99",
        "format": ["Paperback", " e-Book"],
        "genre": [" Fantasy"],
        "category": "Fiction",
        "year": "1950",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.2",
        "quantity": 43
    },
    {
        "_id": 7,
        "isbn": 9780141353821,
        "title": "The Summer I Turned Pretty",
        "author": "Jenny Han",
        "description": "Belly measures her life in summers. Everything good, everything magical happens between the months of June and August. Winters are simply a time to count the weeks until the next summer, a place away from the beach house, away from Susannah, and most importantly, away from Jeremiah and Conrad. They are the boys that Belly has known since her very first summer—they have been her brother figures, her crushes, and everything in between. But one summer, one terrible and wonderful summer, the more everything changes, the more it all ends up just the way it should have been all along (goodreads.com).",
        "image": "images/tsitp2.jpg",
        "price": "11.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Romance", "Young Adult"],
        "category": "Fiction",
        "year": "2009",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.5",
        "quantity": 26
    },
    {
        "_id": 8,
        "isbn": 9780385546881,
        "title": "The Frozen River",
        "author": "Ariel Lawhon",
        "description": "DeMaine, 1789: When the Kennebec River freezes, entombing a man in the ice, Martha Ballard is summoned to examine the body and determine cause of death. As a midwife and healer, she is privy to much of what goes on behind closed doors in Hallowell. Her diary is a record of every birth and death, crime and debacle that unfolds in the close-knit community. Months earlier, Martha documented the details of an alleged rape committed by two of the town's most respected gentlemen—one of whom has now been found dead in the ice. But when a local physician undermines her conclusion, declaring the death to be an accident, Martha is forced to investigate the shocking murder on her own.\nOver the course of one winter, as the trial nears, and whispers and prejudices mount, Martha doggedly pursues the truth. Her diary soon lands at the center of the scandal, implicating those she loves, and compelling Martha to decide where her own loyalties lie.\nClever, layered, and subversive, Ariel Lawhon's newest offering introduces an unsung heroine who refused to accept anything less than justice at a time when women were considered best seen and not heard. The Frozen River is a thrilling, tense, and tender story about a remarkable woman who left an unparalleled legacy yet remains nearly forgotten to this day (goodreads.com)",
        "image": "images/frozenriver2.jpg",
        "price": "18.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Mystery", "Thriller"],
        "category": "Fiction",
        "year": "2023",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.4",
        "quantity": 19
    },
    {
        "_id": 9,
        "isbn": 9781619634442,
        "title": "A Court of Thorns and Roses",
        "author": "Sarah J. Maas",
        "description": "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world. \nAt least, he's not a beast all the time. \nAs she adapts to her new home, her feelings for the faerie, Tamlin, transform from icy hostility into a fiery passion that burns through every lie she's been told about the beautiful, dangerous world of the Fae. But something is not right in the faerie lands. An ancient, wicked shadow is growing, and Feyre must find a way to stop it, or doom Tamlin—and his world—forever (goodreads.com).",
        "image": "images/acotar3.jpg",
        "price": "14.99",
        "format": ["Harcover", " Paperback", " e-Book"],
        "genre": ["Romance", "Fantasy"],
        "category": "Fiction",
        "year": "2015",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.3",
        "quantity": 22
    },
    {
        "_id": 10,
        "isbn": 9780582541528,
        "title": "The Secret Garden",
        "author": "Frances Hodgson Burnett",
        "description": "In a house full of sadness and secrets, can young, orphaned Mary find happiness? \nMary Lennox, a spoiled, ill-tempered, and unhealthy child, comes to live with her reclusive uncle in Misselthwaite Manor on England's Yorkshire moors after the death of her parents. There she meets a hearty housekeeper and her spirited brother, a dour gardener, a cheerful robin, and her wilful, hysterical, and sickly cousin, Master Colin, whose wails she hears echoing through the house at night. \nWith the help of the robin, Mary finds the door to a secret garden, neglected and hidden for years. When she decides to restore the garden in secret, the story becomes a charming journey into the places of the heart, where faith restores health, flowers refresh the spirit, and the magic of the garden, coming to life anew, brings health to Colin and happiness to Mary (goodreads.com).",
        "image": "images/secretgarden2.jpg",
        "price": "14.99",
        "format": ["Harcover", " Paperback", " e-Book"],
        "genre": "Fantasy",
        "category": ["Fiction", "Classic"],
        "year": "1911",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.2",
        "quantity": 17
    },
    {
        "_id": 11,
        "isbn": 9780349147192,
        "title": "Revenge of the Tipping Point",
        "author": "Malcolm Gladwell",
        "description": "Twenty-five years after the publication of his groundbreaking first book, Malcolm Gladwell returns with a brand-new volume that reframes the lessons of The Tipping Point in a startling and revealing light. \nWhy is Miami…Miami? What does the heartbreaking fate of the cheetah tell us about the way we raise our children? Why do Ivy League schools care so much about sports? What is the Magic Third, and what does it mean for racial harmony? In this provocative new work, Malcolm Gladwell returns for the first time in twenty-five years to the subject of social epidemics and tipping points, this time with the aim of explaining the dark side of contagious phenomena. \nThrough a series of riveting stories, Gladwell traces the rise of a new and troubling form of social engineering. He takes us to the streets of Los Angeles to meet the world's most successful bank robbers, rediscovers a forgotten television show from the 1970s that changed the world, visits the site of a historic experiment on a tiny cul-de-sac in northern California, and offers an alternate history of two of the biggest epidemics of our day: COVID and the opioid crisis. Revenge of the Tipping Point is Gladwell's most personal book yet. With his characteristic mix of storytelling and social science, he offers a guide to making sense of the contagions of modern world. It's time we took tipping points seriously (goodreads.com).",
        "image": "images/revengeofthetippingpoint2.jpg",
        "price": "19.99",
        "format": ["Harcover", " Paperback", " e-Book"],
        "genre": "Psychology",
        "category": "Nonfiction",
        "year": "2024",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.1",
        "quantity": 17
    },
    {
        "_id": 12,
        "isbn": 9781551929781,
        "title": "Harry Potter and the Deathly Hallows",
        "author": "J.K. Rowling",
        "description": "It's no longer safe for Harry at Hogwarts, so he and his best friends, Ron and Hermione, are on the run. Professor Dumbledore has given them clues about what they need to do to defeat the dark wizard, Lord Voldemort, once and for all, but it's up to them to figure out what these hints and suggestions really mean. Their cross-country odyssey has them searching desperately for the answers, while evading capture or death at every turn. At the same time, their friendship, fortitude, and sense of right and wrong are tested in ways they never could have imagined. The ultimate battle between good and evil that closes out this final chapter of the epic series takes place where Harry's Wizarding life began: at Hogwarts. The satisfying conclusion offers shocking last-minute twists, incredible acts of courage, powerful new forms of magic, and the resolution of many mysteries. Above all, this intense, cathartic book serves as a clear statement of the message at the heart of the Harry Potter series: that choice matters much more than destiny, and that love will always triumph over death (goodreads.com).",
        "image": "images/deathlyhallows2.jpg",
        "price": "17.99",
        "format": ["Harcover", " Paperback", " e-Book"],
        "genre": ["Fantasy", "Mystery"],
        "category": "Fiction",
        "year": "2007",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.6",
        "quantity": 26
    },
    {
        "_id": 13,
        "isbn": 9781649374189,
        "title": "Onyx Storm",
        "author": "Rebecca Yarros",
        "description": "After nearly eighteen months at Basgiath War College, Violet Sorrengail knows there's no more time for lessons. No more time for uncertainty. Because the battle has truly begun, and with enemies closing in from outside their walls and within their ranks, it's impossible to know who to trust. \nNow Violet must journey beyond the failing Aretian wards to seek allies from unfamiliar lands to stand with Navarre. The trip will test every bit of her wit, luck, and strength, but she will do anything to save what she loves—her dragons, her family, her home, and him. \nEven if it means keeping a secret so big, it could destroy everything. They need an army. They need power. They need magic. And they need the one thing only Violet can find—the truth. But a storm is coming...and not everyone can survive its wrath (goodreads.com).",
        "image": "images/onyxstorm2.jpg",
        "price": "29.99",
        "format": ["Harcover", " e-Book"],
        "genre": ["Fantasy", "Romance"],
        "category": "Fiction",
        "year": "2025",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.3",
        "quantity": 28
    },
    {
        "_id": 14,
        "isbn": 9781401971366,
        "title": "The Let Them Theory",
        "author": "Mel Robbins",
        "description": "What if the key to happiness, success, and love was as simple as two words? \nIf you've ever felt stuck, overwhelmed, or frustrated with where you are, the problem isn't you. The problem is the power you give to other people. Two simple words—Let Them—will set you free. Free from the opinions, drama, and judgments of others. Free from the exhausting cycle of trying to manage everything and everyone around you. The Let Them Theory puts the power to create a life you love back in your hands—and this book will show you exactly how to do it. \nIn her latest groundbreaking book, The Let Them Theory, Mel Robbins—New York Times bestselling author and one of the world's most respected experts on motivation, confidence, and mindset—teaches you how to stop wasting energy on what you can't control and start focusing on what truly YOU. Your happiness. Your goals. Your life. \nUsing the same no-nonsense, science-backed approach that's made The Mel Robbins Podcast a global sensation, Robbins explains why The Let Them Theory is already loved by millions and how you can apply it in eight key areas of your life to make the biggest impact. Within a few pages, you'll realize how much energy and time you've been wasting trying to control the wrong things—at work, in relationships, and in pursuing your goals—and how this is keeping you from the happiness and success you deserve. \nWritten as an easy-to-understand guide, Robbins shares relatable stories from her own life, highlights key takeaways, relevant research and introduces you to world-renowned experts in psychology, neuroscience, relationships, happiness, and ancient wisdom who champion The Let Them Theory every step of the way (goodreads.com).",
        "image": "images/theletthemtheory2.jpg",
        "price": "19.99",
        "format": ["Paperback", " e-Book"],
        "genre": "Self-help",
        "category": "Nonfiction",
        "year": "2024",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.2",
        "quantity": 15
    },
    {
        "_id": 15,
        "isbn": 9780593949238,
        "title": "The Life Impossible",
        "author": "Matt Haig",
        "description": "“What looks like magic is simply a part of life we don't understand yet…” \nWhen retired math teacher Grace Winters is left a run-down house on a Mediterranean island by a long-lost friend, curiosity gets the better of her. She arrives in Ibiza with a one-way ticket, no guidebook and no plan. \nAmong the rugged hills and golden beaches of the island, Grace searches for answers about her friend's life, and how it ended. What she uncovers is stranger than she could have dreamed. But to dive into this impossible truth, Grace must first come to terms with her past. \nFilled with wonder and wild adventure, this is a story of hope and the life-changing power of a new beginning (goodreads.com).",
        "image": "images/thelifeimpossible2.jpg",
        "price": "17.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Mystery", "Sci-fi", "Romance"],
        "category": "Fiction",
        "year": "2024",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "3.5",
        "quantity": 24
    },
    {
        "_id": 16,
        "isbn": 9781665955461,
        "title": "Fearless",
        "author": "Lauren Roberts",
        "description": "Paedyn Gray and Kai Azer return to the Kingdom of Ilya… \nAnd Paedyn has a life-altering choice to make. Whatever she decides will determine her fate—and the fate of those around her—forever. \nIn the ultimate battle of love and loyalty, who wins? (goodreads.com)",
        "image": "images/fearless2.jpg",
        "price": "17.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Fantasy", "Romance"],
        "category": "Fiction",
        "year": "2025",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.3",
        "quantity": 30
    },
    {
        "_id": 17,
        "isbn": 9780582541610,
        "title": "Jane Eyre",
        "author": "Charlotte Brontë",
        "description": "Charlotte Brontë tells the story of orphaned Jane Eyre, who grows up in the home of her heartless aunt, enduring loneliness and cruelty. This troubled childhood strengthens Jane's natural independence and spirit - which prove necessary when she finds employment as a governess to the young ward of Byronic, brooding Mr Rochester. As her feelings for Rochester develop, Jane gradually uncovers Thornfield Hall's terrible secret, forcing her to make a choice. Should she stay with Rochester and live with the consequences, or follow her convictions - even if it means leaving the man she loves? A novel of intense power and intrigue, Jane Eyre dazzled readers with its passionate depiction of a woman's search for equality and freedom (goodreads.com).",
        "image": "images/janeeyre2.jpg",
        "price": "9.99",
        "format": "Paperback",
        "genre": ["Gothic", "Historical"],
        "category": ["Fiction", "Classic"],
        "year": "1847",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.2",
        "quantity": 23
    },
    {
        "_id": 18,
        "isbn": 9781784871765,
        "title": "Wuthering Heights",
        "author": "Emily Brontë",
        "description": "Emily Brontë's only novel, a work of tremendous and far-reaching influence, the Penguin Classics edition of Wuthering Heights is the definitive edition of the text, edited with an introduction by Pauline Nestor. Lockwood, the new tenant of Thrushcross Grange, situated on the bleak Yorkshire moors, is forced to seek shelter one night at Wuthering Heights, the home of his landlord. There he discovers the history of the tempestuous events that took place years before; of the intense relationship between the gypsy foundling Heathcliff and Catherine Earnshaw; and how Catherine, forced to choose between passionate, tortured Heathcliff and gentle, well-bred Edgar Linton, surrendered to the expectations of her class. As Heathcliff's bitterness and vengeance at his betrayal is visited upon the next generation, their innocent heirs must struggle to escape the legacy of the past (goodreads.com).",
        "image": "images/wutheringheights2.jpg",
        "price": "9.99",
        "format": "Paperback",
        "genre": ["Gothic", "Historical"],
        "category": ["Fiction", "Classic"],
        "year": "1847",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "3.9",
        "quantity": 15
    },
    {
        "_id": 19,
        "isbn": 9780007488315,
        "title": "The Fellowship of the Ring",
        "author": "J.R.R. Tolkien",
        "description": "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them. \nIn ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit. \nIn a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose. (goodreads.com).",
        "image": "images/lotr2.jpg",
        "price": "14.99",
        "format": ["Paperback", " e-Book"],
        "genre": "Fantasy",
        "category": ["Fiction", "Classic"],
        "year": "1954",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.4",
        "quantity": 27
    },
    {
        "_id": 20,
        "isbn": 9780582426634,
        "title": "Dracula",
        "author": "Bram Stoker",
        "description": "When Jonathan Harker visits Transylvania to help Count Dracula with the purchase of a London house, he makes a series of horrific discoveries about his client. Soon afterwards, various bizarre incidents unfold in England: an apparently unmanned ship is wrecked off the coast of Whitby; a young woman discovers strange puncture marks on her neck; and the inmate of a lunatic asylum raves about the 'Master' and his imminent arrival (goodreads.com).",
        "image": "images/dracula2.jpg",
        "price": "9.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Horror", "Gothic", "Fantasy"],
        "category": ["Fiction", "Classic"],
        "year": "1897",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4",
        "quantity": 16
    },
    {
        "_id": 21,
        "isbn": 9780613371063,
        "title": "Harry Potter and the Prizoner of Azkaban",
        "author": "J.K. Rowling",
        "description": "Harry Potter, along with his best friends, Ron and Hermione, is about to start his third year at Hogwarts School of Witchcraft and Wizardry. Harry can't wait to get back to school after the summer holidays. (Who wouldn't if they lived with the horrible Dursleys?) But when Harry gets to Hogwarts, the atmosphere is tense. There's an escaped mass murderer on the loose, and the sinister prison guards of Azkaban have been called in to guard the school... (goodreads.com).",
        "image": "images/harrypotterpoa2.jpg",
        "price": "14.99",
        "format": ["Hardcover", " Paperback", " e-Book"],
        "genre": ["Fantasy", "Mystery"],
        "category": "Fiction",
        "year": "1999",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.6",
        "quantity": 23
    },
    {
        "_id": 22,
        "isbn": 9781250777904,
        "title": "Six of Crows",
        "author": "Leigh Bardugo",
        "description": "Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams. But he can't pull it off alone... \nA convict with a thirst for revenge \nA sharpshooter who can't walk away from a wager \nA runaway with a privileged past \nA spy known as the Wraith \nA Heartrender using her magic to survive the slums \nA thief with a gift for unlikely escapes \nSix dangerous outcasts. One impossible heist. Kaz's crew is the only thing that might stand between the world and destruction—if they don't kill each other first. (goodreads.com).",
        "image": "images/sixofcrows2.jpg",
        "price": "14.99",
        "format": ["Hardcover", " Paperback", " e-Book"],
        "genre": "Fantasy",
        "category": "Fiction",
        "year": "2015",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.5",
        "quantity": 23
    },
    {
        "_id": 23,
        "isbn": 9780141988498,
        "title": "Talking to Strangers",
        "author": "Malcolm Gladwell",
        "description": "How did Fidel Castro fool the CIA for a generation? Why did Neville Chamberlain think he could trust Adolf Hitler? Why are campus sexual assaults on the rise? Do television sitcoms teach us something about the way we relate to each other that isn't true? \nWhile tackling these questions, Malcolm Gladwell was not solely writing a book for the page. He was also producing for the ear. In the audiobook version of Talking to Strangers, you'll hear the voices of people he interviewed--scientists, criminologists, military psychologists. Court transcripts are brought to life with re-enactments. You actually hear the contentious arrest of Sandra Bland by the side of the road in Texas. As Gladwell revisits the deceptions of Bernie Madoff, the trial of Amanda Knox, and the suicide of Sylvia Plath, you hear directly from many of the players in these real-life tragedies. There's even a theme song - Janelle Monae's \"Hell You Talmbout.\" \nSomething is very wrong, Gladwell argues, with the tools and strategies we use to make sense of people we don't know. And because we don't know how to talk to strangers, we are inviting conflict and misunderstanding in ways that have a profound effect on our lives and our world. (goodreads.com).",
        "image": "images/talkingtostrangers2.jpg",
        "price": "19.99",
        "format": ["Paperback", " e-Book"],
        "genre": ["Psychology", "Self-help"],
        "category": "Nonfiction",
        "year": "2019",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4",
        "quantity": 31
    },
    {
        "_id": 24,
        "isbn": 9780143110910,
        "title": "Behave",
        "author": "Robert Sapolsky",
        "description": "Why do we do the things we do? \nMore than a decade in the making, this game-changing book is Robert Sapolsky's genre-shattering attempt to answer that question as fully as perhaps only he could, looking at it from every angle. Sapolsky's storytelling concept is delightful but it also has a powerful intrinsic logic: he starts by looking at the factors that bear on a person's reaction in the precise moment a behavior occurs, and then hops back in time from there, in stages, ultimately ending up at the deep history of our species and its evolutionary legacy. \nAnd so the first category of explanation is the neurobiological one. A behavior occurs—whether an example of humans at our best, worst, or somewhere in between. What went on in a person's brain a second before the behavior happened? Then Sapolsky pulls out to a slightly larger field of vision, a little earlier in time: What sight, sound, or smell caused the nervous system to produce that behavior? And then, what hormones acted hours to days earlier to change how responsive that individual is to the stimuli that triggered the nervous system? By now he has increased our field of vision so that we are thinking about neurobiology and the sensory world of our environment and endocrinology in trying to explain what happened. \nSapolsky keeps going: How was that behavior influenced by structural changes in the nervous system over the preceding months, by that person's adolescence, childhood, fetal life, and then back to his or her genetic makeup? Finally, he expands the view to encompass factors larger than one individual. How did culture shape that individual's group, what ecological factors millennia old formed that culture? And on and on, back to evolutionary factors millions of years old. \nThe result is one of the most dazzling tours d'horizon of the science of human behavior ever attempted, a majestic synthesis that harvests cutting-edge research across a range of disciplines to provide a subtle and nuanced perspective on why we ultimately do the things we do ... for good and for ill. Sapolsky builds on this understanding to wrestle with some of our deepest and thorniest questions relating to tribalism and xenophobia, hierarchy and competition, morality and free will, and war and peace. Wise, humane, often very funny, Behave is a towering achievement, powerfully humanizing, and downright heroic in its own right (goodreads.com).",
        "image": "images/behave2.jpg",
        "price": "14.99",
        "format": ["Paperback", " e-Book"],
        "genre": "Psychology",
        "category": "Nonfiction",
        "year": "2017",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.4",
        "quantity": 22
    },
    {
        "_id": 25,
        "isbn": 9781515905905,
        "title": "Braiding Sweetgrass",
        "author": "Robin Wall Kimmerer",
        "description": "As a botanist, Robin Wall Kimmerer has been trained to ask questions of nature with the tools of science. As a member of the Citizen Potawatomi Nation, she embraces the notion that plants and animals are our oldest teachers. In Braiding Sweetgrass, Kimmerer brings these lenses of knowledge together to show that the awakening of a wider ecological consciousness requires the acknowledgment and celebration of our reciprocal relationship with the rest of the living world. For only when we can hear the languages of other beings are we capable of understanding the generosity of the earth, and learning to give our own gifts in return (goodreads.com).",
        "image": "images/braidingsweetgrass2.jpg",
        "price": "14.99",
        "format": ["Paperback", " e-Book"],
        "genre": "Biography",
        "category": "Nonfiction",
        "year": "2013",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.5",
        "quantity": 27
    },
    {
        "_id": 26,
        "isbn": 9780316036696,
        "title": "Outliers",
        "author": "Malcolm Gladwell",
        "description": "In this stunning book, Malcolm Gladwell takes us on an intellectual journey through the world of \"outliers\"—the best and the brightest, the most famous and the most successful. He asks the question: what makes high-achievers different? \nHis answer is that we pay too much attention to what successful people are like, and too little attention to where they are from: that is, their culture, their family, their generation, and the idiosyncratic experiences of their upbringing. Along the way he explains the secrets of software billionaires, what it takes to be a great soccer player, why Asians are good at math, and what made the Beatles the greatest rock band. \nBrilliant and entertaining, Outliers is a landmark work that will simultaneously delight and illuminate (goodreads.com).",
        "image": "images/outliers2.jpg",
        "price": "14.99",
        "format": ["Paperback", " e-Book"],
        "genre": "Psychology",
        "category": "Nonfiction",
        "year": "2008",
        "reviews": [
            "\"Great book\"!",
            "\"I loved it!\""
        ],
        "rating": "4.2",
        "quantity": 17
    }
];

app.get("/api/books", (req, res) => {
    res.send(books);
});

app.post("/api/books", upload.single("img"), (req,res)=>{
    const result = validateBook(req.body);

    if(result.error){
        console.log("I have an error");
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const book = {
        _id: books.length,
        title: req.body.title,
        author: req.body.author,
    };

    if(req.file){
        book.image = `images/${req.file.filename}`;
    }

    books.push(book);
    res.status(200).send(book);
});

app.put("/api/books/:id", upload.single("img"),(req,res)=> {
    const book = books.find((book)=>book._id.toString()===(req.params.id));

    if(!book){
        res.status(404).send("The book with the provided id was not found");
        return;
    }
    
    const result = validateBook(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    book.title = req.body.title;
    book.author = req.body.author;

    if(req.file){
        book.image = `images/${req.file.filename}`;
    }

    res.status(200).send(book);
});

app.delete("/api/books/:id", (req,res)=> {
    console.log("I'm trying to delete" + req.params.id);
    const book = books.find((book)=>book._id.toString()===(req.params.id));

    if(!book){
        console.log("Cannot find book");
        res.status(404).send("The book with the provided id was not found");
        return;
    }
    console.log("Found book" + book.title);
    console.log("Deleting book" + book.title);
    const index = books.indexOf(book);
    books.splice(index,1);
    res.status(200).send(book);
});

const validateBook = (book) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        title:Joi.string().min(3).required(),
        author:Joi.string().min(3).required(),
    });
    return schema.validate(book);
}

app.listen(3001, () => {
    console.log("I'm listening");

});