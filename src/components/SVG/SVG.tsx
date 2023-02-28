import { range } from '@cutting/util';
import { scalePoint } from '@visx/scale';
import { useMemo, useRef } from 'react';
import { Grids } from './Grids';
import { useParentSize } from '@cutting/use-get-parent-size';
import type { PreserveAspectRatio } from './types';

interface SVGProps {
  showSvgViewport: boolean;
  showViewbox: boolean;
}

export function SVG({ showSvgViewport, showViewbox }: SVGProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef);

  const { xScale, yScale } = useMemo(() => {
    const xScale = scalePoint({
      domain: [...range(10)],
      range: [0, width],
    });

    const yScale = scalePoint({
      domain: [...range(10)],
      range: [0, height],
    });

    return { xScale, yScale };
  }, [width, height]);

  const radius = xScale(5);

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  return (
    <div className="container" ref={containerRef}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio={'none' as PreserveAspectRatio}
      >
        <g>
          <circle cx={radius} cy={radius} r={radius} />
        </g>
        <Grids
          width={viewBoxWidth}
          height={viewBoxHeight}
          showSvgViewport={showSvgViewport}
          showViewbox={showViewbox}
          viewBoxWidth={width}
          viewBoxHeight={height}
        />
      </svg>
    </div>
  );
}
