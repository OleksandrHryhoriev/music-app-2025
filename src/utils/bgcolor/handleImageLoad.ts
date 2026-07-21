import getColorsFromImage from "./getColorsFromImage";
import updatePalette from "./updatePalette";

export default function handleImageLoad(
   event: React.SyntheticEvent<HTMLImageElement>,
   container: HTMLDivElement | null,
   setBgColor: (color: string) => void,
) {
   const imageElement = event.currentTarget;

   if (
      !imageElement ||
      !(imageElement instanceof HTMLImageElement) ||
      !imageElement.complete
   ) {
      return;
   }

   if (imageElement.naturalWidth === 0 || imageElement.naturalHeight === 0) {
      console.warn("Image has zero dimention.");
      return;
   }

   const { r, g, b } = getColorsFromImage(imageElement);

   if (container !== null) {
      updatePalette(r, g, b, container);
      setBgColor(`rgb(${r}, ${g}, ${b})`);
   }
}
