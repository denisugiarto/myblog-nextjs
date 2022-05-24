import React from "react";
import Link from "next/link";
import Image from "./image";

const Card = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <a className='uk-link-reset'>
        <div className='uk-card uk-card-muted'>
          <div className='uk-card-media-top'>
            {article.attributes.image.data && (
              <Image image={article.attributes.image} size='medium' />
            )}
          </div>
          <div className='uk-card-body'>
            <p id='category' className='uk-text-uppercase'>
              {article.attributes.category.data.attributes.name}
            </p>
            <p id='title' className='uk-text-large'>
              {article.attributes.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
