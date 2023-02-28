import { useParentSize } from '@cutting/use-get-parent-size';
import { useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import { Grids } from './Grids';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { range } from '@cutting/util';
import { Arc, Line, LinePath } from '@visx/shape';
import { Text } from '@visx/text';
import { assert } from 'assert-ts';
import { curveMonotoneX } from '@visx/curve';
import { SVGMathJax } from '@cutting/use-mathjax';
import { breakpoints } from '@cutting/component-library';
import { scaleLinear, scalePoint } from '@visx/scale';
import { initialState, maxTan, reducer } from './reducer';
import { Group, ResponsiveSVG } from '@cutting/svg';
import cs from 'classnames';

const Ticks = [...range(-1, 1)];

const MainTicks = [
  '$4\\pi$',
  '$3\\pi\\over 2$',
  '$3\\pi$',
  '$2\\pi\\over 2$',
  '$2\\pi$',
  '$1\\pi\\over 2$',
  '$-\\pi$',
  '$\\pi\\over 2$',
  '$0$',
  '$-\\pi\\over 2$',
  '$-\\pi$',
  '$-1\\pi\\over 2$',
  '$-2\\pi$',
  '$-2\\pi\\over 2$',
  '$-3\\pi$',
  '$-3\\pi\\over 2$',
  '$-4\\pi$',
];

const circles = 1;

interface SVGProps {
  showSvgViewport: boolean;
  showViewbox: boolean;
}

export function SVG({ showSvgViewport, showViewbox }: SVGProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useParentSize(containerRef);
  const [state, dispatch] = useReducer(reducer, initialState);

  const tickFrame = useRef<number>();

  const { xScale, yScale, mainXscale, tanXScale, tanYScale, unitCircleWidth, initialY } = useMemo(() => {
    const wholeXScale = scaleLinear({
      domain: [0, 10],
      range: [0, width],
    });

    const unitCircleWidth = wholeXScale(3);

    const wholeYScale = scaleLinear({
      domain: [0, 10],
      range: [height, 0],
    });

    const initialY = wholeYScale(9);

    const xScale = scalePoint({
      domain: Ticks,
      range: [0, unitCircleWidth],
    });

    const yScale = scalePoint({
      domain: Ticks,
      range: [unitCircleWidth, 0],
    });

    const mainXscale = scalePoint({
      domain: MainTicks,
      range: [0, width - unitCircleWidth],
    });

    const tanXScale = scaleLinear({
      domain: [-circles * Math.PI * 2, circles * Math.PI * 2],
      range: [0, width - unitCircleWidth],
    });

    const tanYScale = scaleLinear({
      domain: [-maxTan, maxTan],
      range: [unitCircleWidth, 0],
    });

    return { xScale, yScale, mainXscale, tanXScale, tanYScale, unitCircleWidth, initialY };
  }, [width, height]);

  useLayoutEffect(() => {
    tickFrame.current = requestAnimationFrame(() =>
      dispatch({
        type: 'TICK',
        payload: {
          xScale,
          yScale,
          tanXScale,
          tanYScale,
          height,
          width,
          unitCircleWidth,
        },
      }),
    );

    return () => {
      if (!tickFrame.current) {
        return;
      }
      cancelAnimationFrame(tickFrame.current);
    };
  }, [height, state.time, tanXScale, tanYScale, unitCircleWidth, width, xScale, yScale]);

  const yAxisPosition = mainXscale(MainTicks.slice(-1)[0]);

  assert(typeof yAxisPosition === 'number', 'no yAxisPositionX');

  const yAxisX = yAxisPosition / 2;

  const viewBoxWidth = width;
  const viewBoxHeight = height;

  return (
    <>
      <section className="container" ref={containerRef}>
        <ResponsiveSVG width={width} height={height}>
          <Group transform={`translate(0, ${initialY})`}>
            <Group transform={`translate(${yAxisX}, 0)`}>
              <LinePath<number>
                defined={(d) => Math.tan(d) < maxTan && Math.tan(d) > -maxTan}
                className="tan-curve"
                x={(d) => tanXScale(state.time - d)}
                y={(d) => tanYScale(Math.tan(d))}
                curve={curveMonotoneX}
                data={state.tanData}
              />
            </Group>
            <Group transform={`translate(0, ${yScale(0)})`}>
              <AxisBottom
                scale={mainXscale}
                stroke="#ffffff"
                tickStroke="#ffffff"
                tickComponent={(props) => (
                  <Group className="hide-ticks" transform={`translate(${props.x - 5}, ${props.y - 5})`}>
                    <SVGMathJax>{props.formattedValue}</SVGMathJax>
                  </Group>
                )}
              />
            </Group>
            <Group transform={`translate(${width - unitCircleWidth}, 0)`}>
              <circle className="unit-circle" {...state.unitCircle} />
              <Group transform={`translate(${state.unitCircle.cx}, ${state.unitCircle.cy})`}>
                <Arc
                  innerRadius={0}
                  outerRadius={30}
                  startAngle={Math.PI / 2}
                  endAngle={state.angle}
                  fill="#E6F0E6"
                  stroke="#8FBB8F"
                  strokeWidth={2}
                />
                <Text dx={40} dy={-20}>
                  {state.angleText}
                </Text>
              </Group>
              <Group transform={`translate(0, ${yScale(0)})`}>
                <AxisBottom scale={xScale} tickValues={[]} stroke="#ffffff" tickStroke="#ffffff" />
              </Group>
              <AxisLeft scale={yScale} stroke="#ffffff" tickValues={[]} />
              <Group transform={`translate(${state.unitCircle.cx}, ${state.unitCircle.cy})`}>
                <Line className={cs('line', 'hypotenuse')} {...state.hypotenuse} />
                <Line className={cs('line', 'opposite')} {...state.opposite} />
                <Line className={cs('line', 'rear-hypotenuse')} {...state.rearHypotenuse} />
                <Line className={cs('line', 'tan3')} {...state.tan3} />
                <circle className={'dot'} {...state.circleDot} fill="#000000" />
                <circle className={'dot'} {...state.tanDot} fill="#000000" />
                <Group transform={`translate(${state.rearHypotenuse.to.x}, ${state.rearHypotenuse.to.y - 10})`}>
                  <Text>P</Text>
                </Group>
              </Group>
            </Group>
          </Group>
        </ResponsiveSVG>
        <SVGMathJax>{`$f(x) = tan(x) $`}</SVGMathJax>
        <Grids
          width={width}
          height={height}
          showSvgViewport={showSvgViewport}
          showViewbox={showViewbox}
          viewBoxWidth={viewBoxWidth}
          viewBoxHeight={viewBoxHeight}
        />
      </section>
    </>
  );
}
