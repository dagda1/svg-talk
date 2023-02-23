import { ViewPortGrid } from '../ViewPortGrid/ViewPortGrid';

interface GridsProps {
  width: number;
  height: number;
  showSvgViewport: boolean;
  showViewbox: boolean;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

export function Grids({
  showSvgViewport,
  showViewbox,
  width,
  height,
  viewBoxWidth,
  viewBoxHeight,
}: GridsProps): JSX.Element {
  return (
    <>
      <ViewPortGrid width={width} height={height} color="#ffffff" show={showSvgViewport} />
      <ViewPortGrid width={viewBoxWidth} height={viewBoxHeight} color="orange" show={showViewbox} />
    </>
  );
}
