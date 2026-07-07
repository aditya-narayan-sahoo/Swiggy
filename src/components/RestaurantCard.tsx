import React from 'react';
import { Star } from 'lucide-react';
import type { Restaurant } from '../data/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  const offerText = restaurant.offers[0] || '';
  const isHighRating = restaurant.rating >= 4.0;

  return (
    <article className="restaurant-card" onClick={onClick}>
      <div className="card-img-wrapper">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="card-img"
          loading="lazy"
        />
        {restaurant.tags.includes('Promoted') && (
          <span className="card-tag">Promoted</span>
        )}
        {offerText && (
          <div className="card-offer-badge">
            {offerText}
          </div>
        )}
      </div>
      <div className="card-details">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <div className="rating-row">
          <span className={`star-rating ${isHighRating ? '' : 'rating-average'}`}>
            <Star size={12} fill="white" stroke="none" />
            <span>{restaurant.rating}</span>
          </span>
          <span style={{ fontWeight: 700 }}>•</span>
          <span>{restaurant.deliveryTime} mins</span>
        </div>
        <div className="cuisines-list">
          {restaurant.cuisines.join(', ')}
        </div>
        <div className="delivery-details">
          {restaurant.distance} km • ₹{restaurant.costForTwo} for two
        </div>
      </div>
    </article>
  );
};
