import React from 'react';
import { useState } from 'react';

const MessageShowModal = ({ data, openBooking, setBookingOpen }) => {
  const [loading, setLoading] = useState(false);
  const {message} = data;
  return (
    <div>
      {openBooking && (
        <div>
          <input type="checkbox" id="reviewShowModal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <label
                htmlFor="reviewShowModal"
                className="btn btn-primary btn-sm btn-circle absolute right-2 top-2 "
              >
                ✕
              </label>
              <div className="flex justify-center items-center h-fit w-96">
                <div className='break-words h-fit w-96'>
                  <p className='break-words h-fit  w-96'>{message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageShowModal;