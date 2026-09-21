import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

  const [position, setPosition] = useState(null);

  // --------------------------------
  // Existing cookie position logic
  // --------------------------------
  useEffect(() => {
    const updatePosition = () => {
      if (!oRef.current || !targetRef.current) return;

      const o = oRef.current.getBoundingClientRect();
      const target = targetRef.current.getBoundingClientRect();

      const cookieSize = 90;

      setPosition({
        startX:
          o.left +
          o.width / 2 -
          cookieSize / 2,

        startY:
          o.top +
          o.height / 2 -
          cookieSize / 2,

        targetX:
          target.left +
          target.width / 2 -
          cookieSize / 2,

        targetY:
          target.top +
          target.height / 2 -
          cookieSize / 2,
      });
    };

    updatePosition();

    const timer = setTimeout(updatePosition, 1000);

    window.addEventListener("resize", updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // --------------------------------
  // GSAP ScrollTrigger
  // --------------------------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Hero animation
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

      // Cards animation
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

      // Chocolate card special animation
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

      // Cards section movement
      gsap.to(".cards-section", {
        y: -60,
        scrollTrigger: {
          trigger: ".cards-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Cookie scroll rotation
      gsap.to(".scroll-cookie", {
        rotation: 360,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".cards-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const cookieImage =
    `${import.meta.env.BASE_URL}images/cookie.png`;

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

      {position && (
        <motion.img
          src={cookieImage}
          alt="Moving cookie"
          className="scroll-cookie"

          initial={{
            left: position.startX,
            top: position.startY,
          }}

          animate={{
            left: [
              position.startX,
              position.targetX,
              position.startX,
            ],

            top: [
              position.startY,
              position.targetY,
              position.startY,
            ],
          }}

          transition={{
            duration: 8,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}

    </main>
  );
}

export default App;
