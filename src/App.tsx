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

const domain = 50;

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

  const viewboxScale = scaleLinear({
    domain: [0, domain],
    range: [0, width],
    nice: false,
  });

  const viewBoxYScale = scaleLinear({
    domain: [0, domain],
    range: [0, height],
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
          <svg style={{ overflow: 'visible' }} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            <Rects height={height} width={width} />
            {showSvgViewport && (
              <>
                <GridRows scale={svgXscale} width={width} numTicks={domain} height={height} stroke="orange" />
                <GridColumns scale={svgYscale} width={width} numTicks={domain} height={height} stroke="orange" />
                <AxisTop scale={svgXscale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
                <AxisLeft scale={svgXscale} numTicks={domain} tickFormat={(d) => `${d}`} axisClassName="axis-label" />
              </>
            )}
            {showViewbox && (
              <>
                <GridRows
                  scale={viewboxScale}
                  numTicks={domain}
                  width={viewBoxWidth}
                  height={adjustedHeight}
                  stroke="yellow"
                />
                <GridColumns
                  scale={viewBoxYScale}
                  width={width}
                  numTicks={domain}
                  height={adjustedHeight}
                  stroke="yellow"
                />
              </>
            )}
          </svg>
        </>
      </ApplicationLayout>
    </>
  );
}
