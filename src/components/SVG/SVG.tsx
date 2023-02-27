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

  const preserveAspectRatio: PreserveAspectRatio = 'xMinYMin meet';

  const { xScale, yScale, radius } = useMemo(() => {
    const xScale = scalePoint({
      domain: [...range(10)],
      range: [0, width],
    });

    const yScale = scalePoint({
      domain: [...range(10)],
      range: [0, height],
    });

    const radius = xScale(3);

    console.log(radius);

    return { radius, xScale, yScale };
  }, [width, height]);

  const { adjustedWidth, adjustedHeight } = useMemo(() => {
    if (!svgRef.current || !containerRef.current) {
      return { adjustedWidth: width, adjustedHeight: height };
    }

    const { width: svgWidth, height: svgHeight } = svgRef.current.getBoundingClientRect();

    const aspect = 3; //svgWidth / svgHeight;

    console.log({ aspect, svgWidth, svgHeight, width, height });

    return { svgWidth, svgHeight, adjustedWidth: width, adjustedHeight: Math.round(width / aspect) };
  }, [height, width]);

  console.log({ adjustedWidth, adjustedHeight, width, height });

  return (
    <div className="container" ref={containerRef}>
      <svg
        ref={svgRef}
        viewBox={`${0} ${0} ${adjustedWidth} ${adjustedHeight}`}
        preserveAspectRatio={preserveAspectRatio}
        style={{ overflow: 'visible' }}
      >
        <g>
          <circle cx={xScale(5)} cy={yScale(5)} r={radius} fill="#ffffff" />
        </g>
        <Grids
          width={width}
          height={height}
          showSvgViewport={showSvgViewport}
          showViewbox={showViewbox}
          viewBoxWidth={adjustedWidth}
          viewBoxHeight={adjustedHeight}
        />
      </svg>
    </div>
  );
}
