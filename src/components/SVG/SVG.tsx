import { range } from '@cutting/util';
import { scalePoint } from '@visx/scale';
import { useMemo, useRef } from 'react';
import { Grids } from './Grids';
import type { ResponsiveSVG } from '@cutting/svg';
import { useParentSize } from '@cutting/use-get-parent-size';

type Props<C> = C extends (p: infer P) => JSX.Element ? P : never;

interface SVGProps {
  showSvgViewport: boolean;
  showViewbox: boolean;
}

type PreserveAspectRatio = Props<typeof ResponsiveSVG>['preserveAspectRatio'];

export function SVG({ showSvgViewport, showViewbox }: SVGProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
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

  const preserveAspectRatio: PreserveAspectRatio = 'none';

  const radius = xScale(5);

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  return (
    <div className="container" ref={containerRef}>
      <svg
        width={width}
        height={height}
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio={preserveAspectRatio}
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
