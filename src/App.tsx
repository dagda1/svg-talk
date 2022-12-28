import './App.css';
import { ApplicationLayout, Button } from '@cutting/component-library';
import { Rects } from './components/Rects/Rects';
import { useToggle } from './hook/useToggle';
import { useRef } from 'react';
import { useParentSize } from '@cutting/use-get-parent-size';

export function App(): JSX.Element {
  const [showViewport, setViewport] = useToggle();
  const [, setSvgViewport] = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef, { debounceDelay: 100 });

  console.log(width, height);
  return (
    <>
      <ApplicationLayout center theme="salesTheme">
        <header>
          <Button type="button" buttonStyle="secondary" onClick={setViewport}>
            Browser Viewport
          </Button>
          <Button type="button" buttonStyle="secondary" onClick={setSvgViewport}>
            SVG Viewport
          </Button>
          <Button type="button" buttonStyle="secondary" onClick={setSvgViewport}>
            viewbox
          </Button>
        </header>
        <div className="svg-container" ref={containerRef}>
          <Rects width={width} height={height} />
        </div>
      </ApplicationLayout>
      {showViewport && (
        <div className="grid" ref={containerRef}>
          <div>
            <h2>Browser Viewport</h2>
          </div>
        </div>
      )}
    </>
  );
}
