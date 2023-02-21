import { useParentSize } from '@cutting/use-get-parent-size';
import { scaleLinear } from '@visx/scale';
import { useMemo, useRef } from 'react';
import { Grids } from './Grids';

interface SVGProps {
  showSvgViewport: boolean;
  showViewbox: boolean;
}

export function SVG({ showSvgViewport, showViewbox }: SVGProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef);

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  const { radius } = useMemo(() => {
    const xScale = scaleLinear({ domain: [0, 20], range: [0, width] });
    const yScale = scaleLinear({ domain: [0, 20], range: [height, 0] });

    const radius = yScale(12);

    return { radius, xScale, yScale };
  }, [width, height]);

  console.log(radius);
  return (
    <div ref={containerRef} className="container">
      {/* <svg width="500" height="100" viewBox="0 0 500 10" preserveAspectRatio="xMinYMin meet"> */}
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          width: '100%',
          verticalAlign: 'top',
          overflow: 'hidden',
          border: '10px solid red',
        }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMin meet">
          <g>
            <circle r={radius} cx={width / 2} cy={height / 2} fill="#f00" />
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
    </div>
  );
}
