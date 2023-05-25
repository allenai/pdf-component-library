export const RENDER_TYPE = {
  MULTI_CANVAS: 'multi-canvas',
  SINGLE_CANVAS: 'single-canvas',
} as const;

export type RenderType = typeof RENDER_TYPE[keyof typeof RENDER_TYPE];

export type RenderMode = 'canvas' | 'none';

export function getRenderMode(renderType: RenderType): RenderMode {
  switch (renderType) {
    case RENDER_TYPE.SINGLE_CANVAS:
      return 'none';
    default:
      return 'canvas';
  }
}

export function getClassNameSuffixFromRenderType(renderType: RenderType): string {
  switch (renderType) {
    case RENDER_TYPE.SINGLE_CANVAS:
      return 'single-canvas';
    default:
      return 'multi-canvas';
  }
}
