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
      window.removeEventListener(
        "resize",
        updatePosition
      );
    };
  }, []);

  const cookieImage =
    `${import.meta.env.BASE_URL}images/cookie.png`;

  return (
    <>
      <main className="page">

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

      </main>

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

    </>
  );
}

export default App;