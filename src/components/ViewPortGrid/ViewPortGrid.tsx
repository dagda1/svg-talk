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
  const xScale = scalePoint({
    domain: [...range(10)],
    range: [width, 0],
  });

  const yScale = scalePoint({
    domain: [...range(10)],
    range: [0, height],
  });

  return show ? (
    <>
      <GridRows scale={yScale} width={width} stroke={color} />
      <GridColumns scale={xScale} height={height} stroke={color} />
      <AxisTop scale={xScale} numTicks={domain} tickFormat={(d) => `${10 - d}`} axisClassName="axis-label" />
      <AxisLeft scale={yScale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
    </>
  ) : null;
}
