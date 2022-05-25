// import { getStrapiMedia } from "../lib/media";
import Image from "next/image";
import { getStrapiMedia } from "../lib/media";

const Images = ({ image, size = "thumbnail" }) => {
  const { alternativeText } = image.data.attributes;
  const { width, height } = image.data.attributes.formats[size];
  return (
    <Image
      width={width}
      height={height}
      objectFit='contain'
      src={getStrapiMedia(image, size)}
      alt={alternativeText || ""}
      style={{
        borderRadius: "5px",
      }}
    />
  );
};

export default Images;
