import { GridRows, GridColumns } from '@visx/grid';

interface RectsProps {
  width: number;
  height: number;
}

export function Rects({ width, height }: RectsProps): JSX.Element {
  return (
    <svg style={{ height: '100%', width: '100%' }}>
      {/* <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
      <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" /> */}
      <rect
        x="20%"
        y="20%"
        width="100%"
        height="100%"
        rx="20"
        style={{ fill: '#ff0000', stroke: '#000000', strokeWidth: '2px' }}
      />

      <rect
        x="10%"
        y="10%"
        width="100%"
        height="100%"
        rx="40"
        style={{ fill: '#0000ff', stroke: '#000000', strokeWidth: '2px', fillOpacity: 0.7 }}
      />
    </svg>
  );
}
