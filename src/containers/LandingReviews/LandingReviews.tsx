import React from 'react';

import Carousels from '@/components/Carousels';
import ReviewCard from '@/components/ReviewCard';

import { TLandingReviewsProps } from './LandingReviews.types';
import { dataReviews } from '@/containers/LandingReviews/LandingReviews.data';

const LandingReviews: React.FC<TLandingReviewsProps> = () => {
  return (
    <section className="LandingReviews">
      <div className="container">
        <div className="LandingReviews-wrapper">
          <h2 className="LandingReviews-title">Học viên nói gì về ABU English Club</h2>
          <p className="LandingReviews-description">
            Từng nhận xét của học viên, trung tâm luôn tiếp nhận thông tin và cải thiện để đảm bảo được chất lượng đầu
            ra của khóa học
          </p>

          <div className="LandingReviews-main">
            <Carousels variableWidth arrows={false} autoplay infinite dots={false}>
              {dataReviews.map((item, index) => (
                <div key={index} className="LandingReviews-main-item">
                  <ReviewCard {...item} />
                </div>
              ))}
            </Carousels>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingReviews;
