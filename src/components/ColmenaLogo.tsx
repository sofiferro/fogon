export function ColmenaLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 26"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Panal de 3 hexágonos en forma de triángulo */}
      <polygon
        points="11,1 18.5,5.5 18.5,14.5 11,19 3.5,14.5 3.5,5.5"
        fill="#510d09"
        opacity="0.85"
      />
      <polygon
        points="7,12 11,14.5 15,12 15,7 11,4.5 7,7"
        fill="#fff2d8"
        opacity="0.6"
      />
      <polygon
        points="11,8 13.5,9.5 13.5,12.5 11,14 8.5,12.5 8.5,9.5"
        fill="#510d09"
      />
    </svg>
  );
}
