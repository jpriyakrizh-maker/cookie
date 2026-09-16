function ProductCard({
  number,
  name,
  description,
  price,
  center = false,
  targetRef,
}) {
  const cookieImage =
    `${import.meta.env.BASE_URL}images/cookie.png`;

  return (
    <article className={`card ${center ? "center-card" : ""}`}>

      <div className="card-number">
        {number}
      </div>

      {center ? (
        <div className="card-cookie-space">
          <div
            ref={targetRef}
            className="cookie-target-ring"
          ></div>
        </div>
      ) : (
        <div className="card-cookie-image">
          <img
            src={cookieImage}
            alt={`${name} cookie`}
          />
        </div>
      )}

      <div className="card-info">
        <h3>{name}</h3>

        <p>{description}</p>

        <div className="price-row">
          <strong>{price}</strong>

          <button type="button">+</button>
        </div>
      </div>

    </article>
  );
}

export default ProductCard;