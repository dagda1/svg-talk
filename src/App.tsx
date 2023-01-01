import './App.css';
import { ApplicationLayout, Button } from '@cutting/component-library';
import { Rects } from './components/Rects/Rects';
import { useToggle } from './hook/useToggle';
import { useRef } from 'react';
import { useParentSize } from '@cutting/use-get-parent-size';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLinear } from '@visx/scale';
import cs from 'classnames';
import { AxisTop, AxisLeft } from '@visx/axis';

const domain = 10;

export function App(): JSX.Element {
  const [showViewport, setViewport] = useToggle();
  const [showSvgViewport, setSvgViewport] = useToggle();
  const [showViewbox, setViewbox] = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef, { debounceDelay: 1000 });

  const aspect = width / height;

  const adjustedHeight = Math.ceil(width / aspect);

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  console.dir({ width, height, adjustedHeight, aspect });

  const svgXscale = scaleLinear({
    domain: [0, domain],
    range: [0, width],
    nice: false,
  });

  const svgYscale = scaleLinear({
    domain: [0, domain],
    range: [0, height],
    nice: false,
  });

  const viewboxXScale = scaleLinear({
    domain: [0, domain],
    range: [0, viewBoxWidth],
    nice: false,
  });

  const viewBoxYScale = scaleLinear({
    domain: [0, domain],
    range: [0, viewBoxHeight],
    nice: false,
  });

  return (
    <>
      <ApplicationLayout
        center
        theme="salesTheme"
        innerRef={containerRef}
        className={cs({ grid: showViewport })}
        header={
          <>
            <Button type="button" buttonStyle="secondary" onClick={setViewport}>
              Browser Viewport
            </Button>
            <Button type="button" buttonStyle="secondary" onClick={setSvgViewport}>
              SVG Viewport
            </Button>
            <Button type="button" buttonStyle="secondary" onClick={setViewbox}>
              viewbox
            </Button>
          </>
        }
      >
        <>
          <svg
            style={{ overflow: 'visible' }}
            width={width}
            height={height}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="xMaxYMid meet"
          >
            <Rects height={height} width={width} />
            {showSvgViewport && (
              <>
                <GridRows scale={viewBoxYScale} width={viewBoxWidth} stroke="green" />
                <GridColumns scale={viewboxXScale} height={viewBoxHeight} stroke="green" />
                <AxisTop
                  scale={viewboxXScale}
                  numTicks={domain}
                  tickFormat={(d) => `${d}`}
                  axisClassName="axis-label"
                />
                <AxisLeft
                  scale={viewBoxYScale}
                  numTicks={domain}
                  tickFormat={(d) => `${d}`}
                  axisClassName="axis-label"
                />
              </>
            )}
            {showViewbox && (
              <>
                <GridRows scale={svgYscale} width={width} stroke="orange" />
                <GridColumns scale={svgXscale} height={height} stroke="orange" />
                <AxisTop scale={svgXscale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
                <AxisLeft scale={svgYscale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
              </>
            )}
          </svg>
        </>
      </ApplicationLayout>
    </>
  );
}
