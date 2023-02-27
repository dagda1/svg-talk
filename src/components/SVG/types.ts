import type { SVGAttributes as SvgAttributes } from 'react';

export type PreserveAspectRatioAlignment =
  | 'xMinYMin'
  | 'xMidYMin'
  | 'xMaxYMin'
  | 'xMinYMid'
  | 'xMidYMid'
  | 'xMaxYMid'
  | 'xMinYMax'
  | 'xMidYMax'
  | 'xMaxYMax';

export type MeetOrSlice = 'meet' | 'slice';

export type PreserveAspectRatio = `${PreserveAspectRatioAlignment} ${MeetOrSlice}` | 'none';

export type AddSVGProps<Props, Element extends SVGElement> = Props & Omit<React.SVGProps<Element>, keyof Props>;

export interface Point {
  x: number;
  y: number;
}

export type SVGAttributes<T> = T &
  Omit<SvgAttributes<SVGSVGElement>, 'origin' | 'viewBox' | 'preserveAspectRatio' | 'children '>;

export interface Dimensions {
  width: number;
  height: number;
}

export interface UseParentSizeOptions {
  debounceDelay: number;
  initialValues: Dimensions;
  transformFunc?: ({ width, height }: Dimensions) => Dimensions;
  cuttoff?: number;
}

export type UseParentSizeResult = Dimensions;
