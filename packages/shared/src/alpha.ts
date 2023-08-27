function alpha(color: string, value: number): any {
  // Parse the color to extract its components
  let rgbaComponents;
  if (color.startsWith("#")) {
    // Hex color
    const hexValue = color.substring(1);
    rgbaComponents = [
      parseInt(hexValue.substr(0, 2), 16),
      parseInt(hexValue.substr(2, 2), 16),
      parseInt(hexValue.substr(4, 2), 16),
    ];
  } else if (color.startsWith("rgb(")) {
    // RGB color
    rgbaComponents = color
      .substring(4, color.length - 1)
      .split(",")
      .map(component => parseInt(component.trim(), 10));
  } else if (color.startsWith("rgba(")) {
    // RGBA color
    rgbaComponents = color
      .substring(5, color.length - 1)
      .split(",")
      .map((component, index) =>
        index < 3 ? parseInt(component.trim(), 10) : parseFloat(component.trim())
      );
  } else {
    // Unsupported color format
    throw new Error("Unsupported color format");
  }

  // Ensure the value is within the range [0, 1]
  const alphaValue = Math.min(Math.max(value, 0), 1);

  // Update the alpha component
  rgbaComponents[3] = alphaValue;

  // Format the color based on the components
  if (color.startsWith("#")) {
    return `rgba(${rgbaComponents.join(", ")})`;
  } else if (color.startsWith("rgb(") || color.startsWith("rgba(")) {
    return `rgba(${rgbaComponents.slice(0, 3).join(", ")}, ${rgbaComponents[3]})`;
  }
}

export default alpha;