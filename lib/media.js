import { getStrapiURL } from "./api";

export function getStrapiMedia(media, size = "small") {
  //size = "small", "medium", "large", "thumbnail"
  const { url } = media.data.attributes.formats[size];
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
