import React from 'react';
import { useState } from 'react';

const ReviewShowModal = ({ data, openBooking, setBookingOpen }) => {
  const [loading, setLoading] = useState(false);
  const {review} = data;
  return (
    <div>
      {openBooking && (
        <div>
          <input type="checkbox" id="reviewShowModal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle mt-16">
            <div className="modal-box">
              <label
                htmlFor="reviewShowModal"
                className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="flex justify-center items-center">
                <div>
                  <p>{review}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewShowModal;