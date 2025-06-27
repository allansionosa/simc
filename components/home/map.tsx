import React from 'react';

const Map = () => {
  return (
    <div className="w-full overflow-hidden shadow">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1915983107506!2d120.94816997511037!3d14.814501085697625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397adcfd6eb3e07%3A0xa48dac26e446b588!2sGonzales%20street!5e0!3m2!1sen!2sph!4v1747885723875!5m2!1sen!2sph"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
