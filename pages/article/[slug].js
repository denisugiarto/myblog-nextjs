import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import Seo from "../../components/seo";
import Layout from "../../components/layout";

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image, "medium");
  const smallImageUrl = getStrapiMedia(article.attributes.image);
  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div
        id='banner'
        className='uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin'
        data-src={smallImageUrl}
        data-srcset={imageUrl}
        data-uk-img='loading:eager'>
        <h1>{article.attributes.title}</h1>
      </div>
      <div className='uk-section'>
        <div className='uk-container uk-container-small'>
          <ReactMarkdown children={article.attributes.content} />
          <hr className='uk-divider-small' />
          <div className='uk-grid-small uk-flex-left' data-uk-grid='true'>
            <div>
              {article.attributes.author.data.attributes.picture && (
                <img
                  src={getStrapiMedia(
                    article.attributes.author.data.attributes.picture,
                    "thumbnail"
                  )}
                  alt={
                    article.attributes.author.data.attributes.picture.data.attributes
                      .alternativeText
                  }
                  style={{
                    position: "static",
                    borderRadius: "20%",
                    height: 60,
                  }}
                />
              )}
            </div>
            <div className='uk-width-expand'>
              <p className='uk-margin-remove-bottom'>
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className='uk-text-meta uk-margin-remove-top'>
                <Moment format='dddd, DD MMM YYYY'>{article.attributes.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    fields: ["title", "slug", "description, content"],
    populate: {
      author: {
        populate: ["picture"],
      },
      image: { populate: "format" },
      category: "*",
    },
    publicationState: "live",
  });

  const categoriesRes = await fetchAPI("/categories");

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default Article;
