const StarRating = ({ rating, totalStars = 5 }) => {
 
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={starNumber}
            style={{ color: starNumber <= rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default StarRating