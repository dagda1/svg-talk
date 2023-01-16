import { GridRows, GridColumns } from '@visx/grid';
import { scalePoint } from '@visx/scale';
import { AxisTop, AxisLeft } from '@visx/axis';
import { range } from '@cutting/util';

interface ViewPortGridProps {
  width: number;
  height: number;
  color: string;
  show: boolean;
}

const domain = 10;

export function ViewPortGrid({ width, height, color, show = false }: ViewPortGridProps): JSX.Element | null {
  console.log(width, height, Math.min(width, height));
  const xScale = scalePoint({
    domain: [...range(10)],
    range: [0, Math.min(width, height)],
  });

  const yScale = scalePoint({
    domain: [...range(10)].reverse(),
    range: [Math.min(width, height), 0],
  });

  return show ? (
    <>
      <GridRows scale={yScale} width={width} stroke={color} />
      <GridColumns scale={xScale} height={height} stroke={color} />
      <AxisTop scale={xScale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
      <AxisLeft scale={yScale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
    </>
  ) : null;
}
