import { useParentSize } from '@cutting/use-get-parent-size';
import { useRef } from 'react';
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

  return (
    <div ref={containerRef} className="container">
      <svg style={{ overflow: 'visible' }}>
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
