function Hero({ oRef }) {
  return (
    <section className="hero">
      <div className="background-image"></div>

      <div className="cookie-title">
        <span>C</span>

        {/* Cookie starts here */}
        <div
          className="cookie-o"
          ref={oRef}
        ></div>

        <span>OKIE</span>
      </div>

      <div className="content">
        <small>COOKIE NO. 01</small>

        <h2>
          Small bites.
          <br />
          Big happiness.
        </h2>

        <p>
          Crispy outside, soft inside.
          Freshly baked for your sweetest moments.
        </p>
      </div>
    </section>
  );
}

export default Hero;