import { useParentSize } from '@cutting/use-get-parent-size';
import { scalePoint } from '@visx/scale';
import { useEffect, useRef, useState } from 'react';
import { Grids } from './Grids';
import { Polygon, LinePath } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveNatural } from '@visx/curve';

interface SVGProps {
  showSvgViewport: boolean;
  showViewbox: boolean;
}

export function SVG({ showSvgViewport, showViewbox }: SVGProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef, { debounceDelay: 1000 });
  const [count, setCount] = useState(0);

  const tickFrame = useRef<number>();

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  const xScale = scalePoint({
    domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    range: [0, width],
  });

  const yScale = scalePoint({
    domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    range: [0, height],
  });

  useEffect(() => {
    tickFrame.current = requestAnimationFrame(() => setCount((prev) => (prev >= 200 ? 0 : prev + 2)));
    return () => {
      if (!tickFrame.current) {
        return;
      }
      cancelAnimationFrame(tickFrame.current);
    };
  }, [count]);

  return (
    <div ref={containerRef} className="container">
      <svg style={{ overflow: 'visible' }} width="800" height="600">
        <g transform={`translate(${0}, ${0})`}>
          <Polygon
            sides={6}
            rotate={count}
            size={count < 200 ? count : 200}
            center={{ x: xScale(5) as number, y: yScale(5) as number }}
          />
          <rect x={xScale(6)} y={yScale(5)} width={xScale(1)} height={yScale(1)} fill="blue" stroke="blue" />

          <g transform={`translate(0, ${yScale(5)})`}>
            <AxisBottom
              scale={xScale}
              stroke="#ffffff"
              tickStroke="#ffffff"
              tickFormat={(x) => String(Number(x) - 5)}
            />
          </g>
          <g transform={`translate(${xScale(5)}, 0)`}>
            <AxisLeft scale={yScale} stroke="#ffffff" tickFormat={(x) => String(-(Number(x) - 5))} />
          </g>

          <LinePath
            data={[
              { x: 2, y: 1 },
              { x: 5, y: 5 },
              { x: 8, y: 1 },
            ]}
            x={(d) => xScale(d.x) as number}
            y={(d) => yScale(d.y) as number}
            strokeWidth={2}
            stroke="#fff"
          />
          <LinePath
            data={[
              { x: 0, y: 4 },
              { x: 3, y: 9 },
              { x: 5, y: 2 },
              { x: 9, y: 6 },
            ]}
            x={(d) => xScale(d.x) as number}
            y={(d) => yScale(d.y) as number}
            curve={curveNatural}
            strokeWidth={2}
            stroke="#f00"
          />
        </g>
        <Grids
          width={width}
          height={height}
          showSvgViewport={showSvgViewport}
          showViewbox={showViewbox}
          viewBoxWidth={viewBoxWidth}
          viewBoxHeight={viewBoxHeight}
        />
      </svg>
    </div>
  );
}
