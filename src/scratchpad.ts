import { sentiment, stemmer } from './filters/sentiment';

console.log('Hello world!');

const positiveText = `The fire rises between us
And makes us get on the wrong trains
Walk the wrong way
Makes strangers smile greetings on Lewisham way
I bathe in this fire
It warms without burning
Compels without force
And it turns without turning the world
So, please, you keep your purpose
Your poise and your journey
I'll be by the fire
Thinking, nothing I've learned can prepare me
For everything else that needs learning
Is this how it feels to feel certain?
'Cause for so many years my love's been a burden
But now comes this fire to cleanse and restore us
To fuel us and calm us and push us both forwards, forwards -- Kae Tempest, "Firesmoke"`;

console.log(sentiment(positiveText));

const mrRogers = `The thing I remember best about successful people I've met all through the years is their obvious delight in what they're doing and it seems to have very little to do with worldly success. They just 
love what they're doing, and they love it in front of others.
-- Mister Rogers`;

console.log(sentiment(mrRogers));

const pants = `High quality pants. Very comfortable and great 
for sport activities. Good price for nice quality! I recommend 
to all fans of sports`;

console.log(sentiment(pants));

const navySealMeme = `I'll have you know I graduated top of my 
class in the Navy Seals, and I've been involved in numerous secret 
raids on Al-Quaeda, and I have over 300 confirmed kills. I am 
trained in gorilla warfare and I'm the top sniper in the entire 
US armed forces. You are nothing to me but just another target. `;

console.log(sentiment(navySealMeme));

const harrow = `The Saint of Patience was bent over a mirror above a wooden washstand, wearing a suit of antique make beneath his robe. You were grudgingly impressed by the sight of a historical artefact actually being worn: black trousers, black jacket, a plain white shirt with a high white collar, very starched. Augustine had combed his hair into a flat cap against his skull, faultless and shiny, with not a strand out of place. Within the collar sat a funny little black tie that was cut in a curve, and he was knotting it into a fat bow. `;

console.log(sentiment(harrow));

const apnews = `LOS ANGELES (AP) — In the course of 48 hours, two gunmen went on shooting rampages at both ends of California that left 18 dead and 10 wounded.

The unrelated massacres at a dance hall in a Los Angeles suburb on Saturday night and a pair of mushroom farms south of San Francisco on Monday have dealt a blow to the state, which has some of the nation's toughest firearm laws and lowest rates of gun deaths. `;

console.log(sentiment(apnews));

const them = `In years past at the Oscars, we were lucky to get one LGBTQ+ film per category. In 2017, Moonlight stood apart from other Best Picture nominees, and in 2018, Call Me by Your Name occupied the queer lane. On years when the Academy has shown love to multiple LGBTQ+ releases, they’re often not very good — the 2019 nominations for Bohemian Rhapsody and Green Book come to mind — and then, of course, there are awards seasons where scarcely any queer cinema gets recognized.`;

console.log(sentiment(them));
