import { motion } from "framer-motion";

function CookieScroll() {
  return (
    <>
      {/* PARALLEL GLOW OBJECT */}
      <motion.div
        className="cookie-parallel-effect"
        animate={{
          y: [
            0,
            30,
            330,
            330,
            0,
          ],

          scale: [
            0.8,
            0.9,
            1.2,
            1.2,
            0.8,
          ],

          opacity: [
            0.3,
            0.5,
            0.8,
            0.8,
            0.3,
          ],

          rotate: [
            0,
            -8,
            180,
            220,
            360,
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

      {/* MAIN COOKIE */}
      <motion.img
        src="/images/cookie.png"
        alt="Cookie"
        className="scroll-cookie"

        animate={{
          y: [
            0,
            30,
            330,
            330,
            0,
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
    </>
  );
}

export default CookieScroll;