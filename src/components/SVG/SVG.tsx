import { useParentSize } from '@cutting/use-get-parent-size';
import { range } from '@cutting/util';
import { scalePoint } from '@visx/scale';
import { useEffect, useRef, useState } from 'react';
import { Grids } from './Grids';
import { Polygon, LinePath } from '@visx/shape';

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
    domain: [...range(10)],
    range: [0, Math.min(width, height)],
  });

  const yScale = scalePoint({
    domain: [...range(10)].reverse(),
    range: [Math.min(width, height), 0],
  });

  useEffect(() => {
    tickFrame.current = requestAnimationFrame(() => setCount((prev) => prev + 1));
    return () => {
      if (!tickFrame.current) {
        return;
      }
      cancelAnimationFrame(tickFrame.current);
    };
  }, [count]);

  console.log(count);

  return (
    <div ref={containerRef} className="container">
      <svg style={{ overflow: 'visible' }} width="800" height="600">
        <Polygon
          sides={3}
          rotate={count}
          size={count < 200 ? count : 200}
          center={{ x: xScale(5) as number, y: yScale(5) as number }}
        />

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
