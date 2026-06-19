const COLORS = ["#a14347", "#6743a1", "#43a18c", "#a17743", "#43a183"];

export default function getRandomColor() {
   return COLORS[Math.floor(Math.random() * COLORS.length)];
}
