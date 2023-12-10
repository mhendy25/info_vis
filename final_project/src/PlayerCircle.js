import React from 'react';

const PlayerCircle = ({ cx, cy, radius, imageUrl }) => {
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill="#2a5599" stroke="black" />
      <image
        x={cx - radius}  // Adjust the positioning based on the circle's radius
        y={cy - radius}  // Adjust the positioning based on the circle's radius
        width={radius * 2}
        height={radius * 2}
        href={imageUrl}
        clipPath={`url(#clip-${cx}-${cy})`}  // Optional: Apply a clip path to make the image circular
      />
      {/* Optional: Define a clip path to make the image circular */}
      <defs>
        <clipPath id={`clip-${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={radius} />
        </clipPath>
      </defs>
    </g>
  );
};

export default PlayerCircle;
