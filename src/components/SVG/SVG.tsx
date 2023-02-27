import { range } from '@cutting/util';
import { scalePoint } from '@visx/scale';
import { useMemo, useRef } from 'react';
import { Grids } from './Grids';
import type { ResponsiveSVG } from '@cutting/svg';
import { useParentSize } from './useParentSize';

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
  const { width: svgWidth, height: svgHeight } = useParentSize(svgRef);

  const { radius, x, y } = useMemo(() => {
    const xScale = scalePoint({
      domain: [...range(10)],
      range: [0, width],
    });

    const yScale = scalePoint({
      domain: [...range(10)],
      range: [0, height],
    });

    const radius = xScale(8);

    const x = xScale(5);
    const y = yScale(5);

    return { radius, xScale, yScale, x, y };
  }, [width, height]);

  const preserveAspectRatio: PreserveAspectRatio = 'none';

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  console.log({ width, height, svgWidth, svgHeight });

  return (
    <div className="container" ref={containerRef}>
      <svg ref={svgRef} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio={preserveAspectRatio}>
        <g>
          <circle r={radius} cx={x} cy={y} />
          <rect x={0} y={0} width={radius} height={radius} stroke="blue" strokeWidth="8" />
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
