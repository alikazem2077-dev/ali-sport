interface IraqFlagProps {
  className?: string;
}

export function IraqFlag({ className }: IraqFlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Iraq flag" focusable="false">
      <rect width="30" height="7" fill="#CE1126" />
      <rect y="7" width="30" height="6" fill="#FFFFFF" />
      <rect y="13" width="30" height="7" fill="#000000" />
      <rect x="11" y="8.5" width="8" height="3" fill="#007A3D" />
    </svg>
  );
}
