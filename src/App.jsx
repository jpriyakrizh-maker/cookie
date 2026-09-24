import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const oRef = useRef(null);
  const targetRef = useRef(null);
  const pageRef = useRef(null);

  const cookieImage =
    `${import.meta.env.BASE_URL}images/cookie.png`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cookie = document.querySelector(".scroll-cookie");
      const parallel = document.querySelector(".cookie-parallel");

      if (!cookie || !parallel || !oRef.current || !targetRef.current) {
        return;
      }

      const COOKIE_SIZE = 90;
      const RING_SIZE = 140;

      /* =================================
         HERO ANIMATION
      ================================= */

      gsap.from(".hero-content", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".hero-content",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* =================================
         CARDS ANIMATION
      ================================= */

      gsap.from(".product-card", {
        y: 120,
        opacity: 0,
        scale: 0.85,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".cards-section",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });

      /* =================================
         CARD 2
      ================================= */

      gsap.to(".product-card:nth-child(2)", {
        y: -40,
        rotate: 2,

        scrollTrigger: {
          trigger: ".cards-section",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.5,
        },
      });

      /* =================================
         CARDS SECTION
      ================================= */

      gsap.to(".cards-section", {
        y: -60,

        scrollTrigger: {
          trigger: ".cards-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* =================================
         GET DOCUMENT POSITION
      ================================= */

      const getPosition = (element) => {
        const rect = element.getBoundingClientRect();

        return {
          x:
            rect.left +
            window.scrollX +
            rect.width / 2 -
            COOKIE_SIZE / 2,

          y:
            rect.top +
            window.scrollY +
            rect.height / 2 -
            COOKIE_SIZE / 2,
        };
      };

      /* =================================
         HERO START
      ================================= */

      const heroPosition = getPosition(oRef.current);

      /* =================================
         INITIAL COOKIE
      ================================= */

      gsap.set(cookie, {
        position: "absolute",

        left: heroPosition.x,
        top: heroPosition.y,

        rotation: 0,
        scale: 1,
      });

      gsap.set(parallel, {
        position: "absolute",

        left: heroPosition.x - 25,
        top: heroPosition.y - 25,

        rotation: 0,
        scale: 0.7,
        opacity: 0.25,
      });

      /* =================================
         COOKIE → CARD 2
      ================================= */

      const cookieAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-section",

          start: "top 85%",
          end: "top 25%",

          scrub: 1,

          invalidateOnRefresh: true,
        },
      });

      cookieAnimation.to(
        cookie,
        {
          left: () => getPosition(targetRef.current).x,
          top: () => getPosition(targetRef.current).y,

          rotation: 360,
          scale: 0.9,

          ease: "none",
        }
      );

      /* =================================
         PARALLEL RING
      ================================= */

      const ringAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-section",

          start: "top 85%",
          end: "top 25%",

          scrub: 1,

          invalidateOnRefresh: true,
        },
      });

      ringAnimation.to(
        parallel,
        {
          left: () => getPosition(targetRef.current).x - 25,
          top: () => getPosition(targetRef.current).y - 25,

          rotation: 360,
          scale: 1.25,
          opacity: 0.9,

          ease: "none",
        }
      );

      ScrollTrigger.refresh();

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="page">

      <Hero oRef={oRef} />

      <section className="cards-section">

        <ProductCard
          number="01"
          name="Classic"
          description="Buttery & crunchy"
          price="₹199"
        />

        <ProductCard
          number="02"
          name="Chocolate"
          description="Rich & indulgent"
          price="₹299"
          center={true}
          targetRef={targetRef}
        />

        <ProductCard
          number="03"
          name="Hazelnut"
          description="Nutty & delicious"
          price="₹399"
        />

      </section>

      <div className="cookie-parallel"></div>

      <img
        src={cookieImage}
        alt="Moving cookie"
        className="scroll-cookie"
      />

    </main>
  );
}

export default App;