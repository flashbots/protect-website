export const ArrowRight = ({
  height = 18,
  className,
}: {
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.96555 13.2496L6.75107 12.0487L10.968 7.83168H0.375V6.07741H10.968L6.75107 1.86719L7.96555 0.659445L14.2607 6.95455L7.96555 13.2496Z"
        fill="currentColor"
      />
    </svg>
  );
};
