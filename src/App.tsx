import './App.css';
import { ApplicationLayout, Button } from '@cutting/component-library';
import { Rects } from './components/Rects/Rects';
import { useToggle } from './hook/useToggle';
import { useRef } from 'react';
import { useParentSize } from '@cutting/use-get-parent-size';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLinear } from '@visx/scale';
import cs from 'classnames';

export function App(): JSX.Element {
  const [showViewport, setViewport] = useToggle();
  const [showSvgViewport, setSvgViewport] = useToggle();
  const [showViewbox, setViewbox] = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef, { debounceDelay: 1000 });

  const aspect = width / height;

  const adjustedHeight = Math.ceil(width / aspect);

  console.dir({ width, height, adjustedHeight, aspect });

  const svgXscale = scaleLinear({
    domain: [0, 10],
    range: [0, width],
    round: true,
  });

  const svgYscale = scaleLinear({
    domain: [0, 10],
    range: [height, 0],
    round: true,
  });

  const viewboxScale = scaleLinear({
    domain: [0, 10],
    range: [0, width],
    round: true,
  });

  const viewBoxYScale = scaleLinear({
    domain: [0, 10],
    range: [height, 0],
    round: true,
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
          <svg style={{ overflow: 'visible' }} height={height} width={width}>
            <Rects height={height} width={width} />
            {showSvgViewport && (
              <>
                <GridRows scale={svgXscale} width={width} height={height} stroke="orange" />
                <GridColumns scale={svgYscale} width={width} height={height} stroke="orange" />
              </>
            )}
            {showViewbox && (
              <>
                <GridRows scale={viewboxScale} width={width} height={adjustedHeight} stroke="yellow" />
                <GridColumns scale={viewBoxYScale} width={width} height={adjustedHeight} stroke="yellow" />
              </>
            )}
          </svg>
        </>
      </ApplicationLayout>
    </>
  );
}
