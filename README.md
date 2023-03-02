# threejs-gsap-demo

Try web 3d animations using Three.js and GSAP

Resources:
- https://frontend.horse/episode/using-threejs-with-gsap-scrolltrigger
- https://www.youtube.com/watch?v=Q7AOvWpIVHU


## ScrollTrigger
By default, every ScrollTrigger animation is triggered when the top of the trigger hits the bottom of the viewport, and the animation will be completed when the bottom of the trigger element hits the top of the viewport.

- `start: 'top top+=100'` means it will be triggered when the top of the element is `100px` from the top of the viewport.
- `end: '+=200'` means that it will end after scrolling `200px` beyond the start.

`toggleActions` is ScrollTrigger property that lets you control the playback of your animation during 4 stages. By default, it will only play when the `start` label meets the `scroller-start` label and do nothing during the other 3 phases. There is plenty of other keywords that you can use:“play”, “pause”, “resume”, “reset”, “restart”, “complete”, “reverse”, and “none”.

```
onEnter - scrolling down, start meets scroller-start
onLeave - scrolling down, end meets scroller-end
onEnterBack - scrolling up, end meets scroller-end
onLeaveBack - scrolling up, start meets scroller-start
```
