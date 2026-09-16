import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

function App() {
  const oRef = useRef(null);
  const targetRef = useRef(null);

  const [position, setPosition] = useState(null);

  useEffect(() => {
    const calculatePosition = () => {
      if (!oRef.current || !targetRef.current) {
        return;
      }

      // Moving cookie size
      const cookieSize = 90;

      // =========================
      // O POSITION
      // =========================

      const o = oRef.current.getBoundingClientRect();

      const startX =
        o.left +
        o.width / 2 -
        cookieSize / 2;

      const startY =
        o.top +
        o.height / 2 -
        cookieSize / 2 +
        window.scrollY;

      // =========================
      // EXACT CARD 2 CIRCLE
      // =========================

      const target =
        targetRef.current.getBoundingClientRect();

      const targetX =
        target.left +
        target.width / 2 -
        cookieSize / 2;

      const targetY =
        target.top +
        target.height / 2 -
        cookieSize / 2 +
        window.scrollY;

      setPosition({
        startX,
        startY,
        targetX,
        targetY,
      });
    };

    const timer = setTimeout(
      calculatePosition,
      500
    );

    window.addEventListener(
      "resize",
      calculatePosition
    );

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "resize",
        calculatePosition
      );
    };
  }, []);

  return (
    <main className="page">

      {/* HERO */}

      <Hero oRef={oRef} />

      {/* MOVING COOKIE */}

      {position && (
        <motion.img
          src="/images/cookie.png"
          alt="Moving cookie"
          className="scroll-cookie"

          initial={{
            x: position.startX,
            y: position.startY,
          }}

          animate={{
            x: [
              position.startX,
              position.targetX,
              position.startX,
            ],

            y: [
              position.startY,
              position.targetY,
              position.startY,
            ],
          }}

          transition={{
            duration: 8,

            times: [
              0,
              0.5,
              1,
            ],

            ease: "easeInOut",

            repeat: Infinity,

            repeatDelay: 1,
          }}
        />
      )}

      {/* PRODUCT CARDS */}

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
          center
          targetRef={targetRef}
        />

        <ProductCard
          number="03"
          name="Hazelnut"
          description="Nutty & delicious"
          price="₹399"
        />

      </section>

    </main>
  );
}

export default App;