import { gsap } from 'https://cdn.skypack.dev/gsap@3.11.0';
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.11.0/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".panel").forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    pin: true,
    pinSpacing: false,
    snap: 1
  });
});

let horizontals = gsap.utils.toArray(".horizontal");

gsap.to(horizontals, {
  xPercent: -100 * (horizontals.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top top", 
    pin: true,
    scrub: 1,
    snap: 1 / (horizontals.length - 1)
  }
});
