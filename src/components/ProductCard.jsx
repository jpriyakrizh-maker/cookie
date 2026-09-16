function ProductCard({
  number,
  name,
  description,
  price,
  center = false,
  targetRef,
}) {
  return (
    <article
      className={`card ${center ? "center-card" : ""}`}
    >
      <div className="card-number">
        {number}
      </div>

      {center ? (
        <div
          ref={targetRef}
          className="card-cookie-space"
        >
          <div className="cookie-target-ring"></div>
        </div>
      ) : (
        <div className="card-cookie-image">
          <img
            src="/images/cookie.png"
            alt={`${name} cookie`}
          />
        </div>
      )}

      <div className="card-info">
        <h3>{name}</h3>

        <p>{description}</p>

        <div className="price-row">
          <strong>{price}</strong>

          <button type="button">
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;