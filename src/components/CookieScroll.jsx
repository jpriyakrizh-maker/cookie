import { motion } from "framer-motion";

function CookieScroll() {
  return (
    <motion.img
      src="/images/cookie.png"
      alt="Cookie"
      className="moving-cookie"

      animate={{
        y: [
          0,     // Hero O
          30,    // slight movement
          330,   // center card
          330,   // stop on card
          0,     // return to Hero
        ],

        rotate: [
          0,
          -8,
          180,
          220,
          360,
        ],

        scale: [
          1,
          1,
          0.9,
          0.9,
          1,
        ],
      }}

      transition={{
        duration: 9,

        times: [
          0,
          0.15,
          0.55,
          0.70,
          1,
        ],

        repeat: Infinity,

        ease: "easeInOut",
      }}
    />
  );
}

export default CookieScroll;