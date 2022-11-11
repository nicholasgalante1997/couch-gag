export function reduceImageSizeByFactor(
  f: number,
  imageDimensions: { height: number; width: number }
) {
  return {
    height: imageDimensions.height / f,
    width: imageDimensions.width / f
  };
}
