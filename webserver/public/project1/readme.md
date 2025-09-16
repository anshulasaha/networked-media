Concept
I wanted a small hypertext piece about memory: how it scatters, loops, and leaves blanks. The landing page title : ALLOW / ME TO / GATHER / MYSELF  is split into individual letters so I can animate them. As the reader scrolls into the next section (where the memory “objects” live), the letters scatter in slightly different directions.
Honest note
I’m not 100% happy with my output yet. A lot of that is because I saw a reference on Pinterest and became fixated on doing a letter-by-letter animation using only CSS. That constraint was exciting but also slowed me down while I learned the newer scroll-linked animation features.
What I learned (sources)
I found a YouTube walkthrough that showed that breaking a word into multiple <span> elements lets you target each letter with its own transform. From there, I looked up:
Using CSS custom properties (--dx, --dy, --rot) so each letter can have unique motion.
@keyframes to define a “gather → scatter” transform.
The newer scroll-linked animation approach: animation-timeline: view() and animation-range so the animation follows scrolling (no JS).
nth-of-type() vs nth-child() (important because <br> tags should not affect the indexing).
Links I referenced (I mixed too many at once — lesson learned).
[Add your YouTube link here: scroll-linked animation / animation-timeline]
[Add your MDN article link here: animation-timeline: view() / animation-range]
[Add your MDN article link here: @font-face basics]
[Add your MDN article link here: :nth-of-type() selectors]
[Add any other specific tutorial you actually watched/read]
Process (step-by-step)
Split the title into spans
I wrote the title as 19 <span> elements, with <br/> to control the line breaks. This lets me target each letter precisely in CSS.
Typography setup
I loaded a local WOFF2 font via @font-face and applied it to the heading. I used clamp() for a responsive font size.
Base animation
I created a @keyframes scatter that moves a letter from translate(0,0) rotate(0) to translate(var(--dx), var(--dy)) rotate(var(--rot)). Every letter receives its own --dx/--dy/--rot via span:nth-of-type(n).
Scroll-linked behavior (no JS)
Inside @supports (animation-timeline: view()), I attached
animation-timeline: view();
animation-range: entry 0% cover 30%;
so the scatter plays as the heading moves through the viewport. Scrolling back up “rewinds” the animation automatically.
Objects grid
I made a small grid of clickable images that link out to fragment pages (e.g., Fragmentation.html). Each is a portal to a tiny poem/idea; some pages will intentionally loop back or go blank to reflect missing pieces.
Things that broke (and how I fixed them)
It looked scattered on load
Cause: with scroll-linked animations, if the heading already “covers” the viewport, the animation progress is effectively complete.
Fix: I ensured the next section had real height/content, and tweaked the range to something like entry 40% cover 80%. Making the hero section min-height: 100vh also helped so the scatter happens as you leave the hero.
nth-child vs nth-of-type
I used <br/> for line breaks; nth-child() counted those and offset my indexing.
Fix: switched to span:nth-of-type(n) so only spans are counted 1→19.
Font loading flicker
I saw fallback text before the webfont.
Fix: I kept font-display: swap (acceptable), and I plan to preload the font in <head> to reduce the flash.
Grid width confusion
I initially duplicated width rules while experimenting. I simplified to width: max-content; margin-inline: auto; and may switch to a responsive repeat(auto-fit, minmax(120px, 1fr)) later.
What I experimented with (and parked)
CSS custom properties for motion: --dx, --dy, --rot per letter was great. I considered randomizing them via JS but stayed pure-CSS for this version.
Stagger: I tried staggering with animation-delay, but for scroll-linked animations the better approach is animation-range staggering per nth-of-type. I’ll revisit that once content is fully locked.
Accessibility / polish (next pass)
Add alt text on the object images (they are navigational).
Respect prefers-reduced-motion:
@media (prefers-reduced-motion: reduce) {
  h1 span { animation: none !important; transform: none !important; }
}


Replace hot-linked GIFs with local, compressed assets and add focus styles on the links.
What I’d do next
Write/attach more fragment pages (Repetition, Distortion, Absence, Anchors, Cultural Dissonance), including intentional loops and blanks.
Tune the scatter distances so the title remains fully readable mid-motion.
Add a tiny legend/footer explaining that some paths intentionally loop or disappear.

Links of References : 
Scroll Animation using only CSS | No JavaScript - Scroll Animation (animation-timeline: view())

Make accessible text animation with HTML and CSS [no JavaScript] - Separating The parts of the phrase Allow Me To Gather Myself 

Incredible scroll-based animations with CSS-only - Animation References 

Learn CSS Grid - A 13 Minute Deep Dive - Grids for the three click-able gifs

https://stackoverflow.com/questions/35995176/shift-and-rotation-using-css	

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties

Inspiration : 
https://pin.it/4k0VIDlrf




