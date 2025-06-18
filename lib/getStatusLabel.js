export const getStatusLabel = (progress) => {
  if (progress === 0) {
    return { label: "Not Started", color: "text-muted-foreground" };
  }

  if (progress === 100) {
    return { label: "Completed", color: "text-green-900" };
  }

  // Define gradient stops from green-100 to green-900
  const greenShades = [
    "text-green-100",
    "text-green-200",
    "text-green-300",
    "text-green-400",
    "text-green-500",
    "text-green-600",
    "text-green-700",
    "text-green-800",
    "text-green-900"
  ];

  // Determine shade index based on progress
  const shadeIndex = Math.min(
    greenShades.length - 1,
    Math.floor((progress / 100) * greenShades.length)
  );

  return { label: "In Progress", color: greenShades[shadeIndex] };
};
