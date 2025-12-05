// ui/tokens/color-utils.ts

export function extractTextColorClass(
  classes: string[],
  fallBack: string = "text-black"
): string {
  return classes.find((c) => c.startsWith("text-")) ?? fallBack;
}

export function extractBgColorClass(
  classes: string[],
  fallBack: string = "bg-white"
): string {
  return classes.find((c) => c.startsWith("bg-")) ?? fallBack;
}

export function extractBorderColorClass(
  classes: string[],
  fallBack: string = "border-gray-200"
): string {
  return classes.find((c) => c.startsWith("border-")) ?? fallBack;
}
