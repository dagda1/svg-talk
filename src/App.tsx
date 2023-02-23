import './App.css';
import { ApplicationLayout, Button } from '@cutting/component-library';
import { useToggle } from './hook/useToggle';
import cs from 'classnames';
import { SVG } from './components/SVG/SVG';

export function App(): JSX.Element {
  const [showViewport, setViewport] = useToggle();
  const [showSvgViewport, setSvgViewport] = useToggle();
  const [showViewbox, setViewbox] = useToggle();

  return (
    <>
      <ApplicationLayout
        center
        theme="cuttingTheme"
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
        <SVG showSvgViewport={showSvgViewport} showViewbox={showViewbox} />
      </ApplicationLayout>
      <div className={cs('bottom', { grid: showViewport })}></div>
    </>
  );
}
