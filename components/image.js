import { getStrapiMedia } from "../lib/media";
import NextImage from "next/image";

const Image = ({ image, size }) => {
  const { alternativeText, width, height } = image.data.attributes;
  return (
    <NextImage
      layout='responsive'
      width={width}
      height={height}
      objectFit='contain'
      src={getStrapiMedia(image, size)}
      alt={alternativeText || ""}
    />
  );
};

export default Image;
