export function Rects({ width, height }: { width: number; height: number }): JSX.Element {
  return (
    <>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="20"
        style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: '2px' }}
      />

      <rect
        x="50"
        y="50"
        width={width}
        height={height}
        rx="20"
        style={{ fill: '#0000ff', stroke: '#000000', strokeWidth: '2px', fillOpacity: 0.7 }}
      />
    </>
  );
}
