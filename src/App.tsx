import './App.css';
import { ApplicationLayout, Button } from '@cutting/component-library';
import { useToggle } from './hook/useToggle';
import { useRef } from 'react';
import { useParentSize } from '@cutting/use-get-parent-size';
import { scaleLinear } from '@visx/scale';
import cs from 'classnames';
import { ViewPortGrid } from './components/ViewPortGrid/ViewPortGrid';

const domain = 10;

export function App(): JSX.Element {
  const [showViewport, setViewport] = useToggle();
  const [showSvgViewport, setSvgViewport] = useToggle();
  const [showViewbox, setViewbox] = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef, { debounceDelay: 1000 });

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  const svgXscale = scaleLinear({
    domain: [0, domain],
    range: [0, Math.min(width, height)],
    nice: true,
  });

  const svgYscale = scaleLinear({
    domain: [0, domain],
    range: [Math.min(width, height), 0],
    nice: true,
  });

  console.log(width, height);

  return (
    <>
      <ApplicationLayout
        center
        theme="defaultTheme"
        innerRef={containerRef}
        className={cs({ grid: showViewport })}
        header={
          <>
            <Button type="button" buttonStyle="primary" onClick={setViewport}>
              Browser Viewport
            </Button>
            <Button type="button" buttonStyle="primary" onClick={setSvgViewport}>
              SVG Viewport
            </Button>
            <Button type="button" buttonStyle="primary" onClick={setViewbox}>
              viewbox
            </Button>
          </>
        }
      >
        <svg style={{ overflow: 'visible' }} width={800} height={600}>
          <ViewPortGrid width={width} height={height} color="#000000" show={showSvgViewport} />
          <ViewPortGrid width={viewBoxWidth} height={viewBoxHeight} color="orange" show={showViewbox} />
        </svg>
      </ApplicationLayout>
      <div className={cs('bottom', { grid: showViewport })}></div>
    </>
  );
}
