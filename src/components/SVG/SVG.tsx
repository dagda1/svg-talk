import { useParentSize } from '@cutting/use-get-parent-size';
import { range } from '@cutting/util';
import { scalePoint } from '@visx/scale';
import { useEffect, useRef, useState } from 'react';
import { Grids } from './Grids';

interface SVGProps {
  showSvgViewport: boolean;
  showViewbox: boolean;
}

const increase = (Math.PI * 2) / 360;

export function SVG({ showSvgViewport, showViewbox }: SVGProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef, { debounceDelay: 1000 });
  const [count, setCount] = useState(0);

  const tickFrame = useRef<number>();
  const viewBoxWidth = width;
  const viewBoxHeight = height;

  const xScale = scalePoint({
    domain: [...range(10)],
    range: [0, width],
  });

  const yScale = scalePoint({
    domain: [...range(10)],
    range: [0, height],
  });

  const radius = yScale(4) as number;

  const dx = (xScale(5) as number) + radius * Math.cos(count);
  const dy = (yScale(5) as number) + radius * -Math.sin(count);

  useEffect(() => {
    tickFrame.current = requestAnimationFrame(() => setCount((prev) => prev + increase));
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
        <circle cx={xScale(5)} cy={yScale(5)} r={xScale(4)} fillOpacity={0} stroke="cyan" strokeWidth={10} />
        <circle cx={dx} cy={dy} r={5} fill="#ffffff" />
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
