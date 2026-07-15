// Sets and updates bgcolor variables for HTML element

export default function updatePalette(
   r: number,
   g: number,
   b: number,
   element: HTMLElement,
) {
   if (!element) return;

   element.style.setProperty(
      "--background-base",
      `oklch(from rgb(${r} ${g} ${b}) 0.32 c h)`,
   );
   element.style.setProperty(
      "--background-base-min-contrast",
      `oklch(from rgb(${r} ${g} ${b}) 0.6 c h)`,
   );
}

// export function setColorOklch(
//    l: number,
//    c: number,
//    h: number,
//    element: HTMLElement,
// ) {
//    if (!element) return;

//    element.style.setProperty("--background-base", `oklch(${l} ${c} ${h})`);
//    element.style.setProperty(
//       "--background-base-min-contrast",
//       `oklch(${l} ${c} ${h})`,
//    );
// }
