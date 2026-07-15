import { getColorSync, RGB } from "colorthief";

const DEFAULT_RGB: RGB = {
   r: 0,
   g: 0,
   b: 0,
};

export default function getColorsFromImage(image: HTMLImageElement): RGB {
   const color = getColorSync(image);
   if (color === null) return DEFAULT_RGB;
   return color.rgb();
}

// export function getSwatchesFromImage(image: HTMLImageElement) {
//    const color = getSwatchesSync(image);

//    return color;
// }
