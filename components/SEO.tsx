
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  jsonLd?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, type = 'website', jsonLd }) => {
  useEffect(() => {
    // Update basic tags
    document.title = `${title} | SÈGANDÉ`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    if (image) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', image);
    }

    // Handle JSON-LD
    const existingScript = document.getElementById('json-ld-data');
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'json-ld-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, image, jsonLd]);

  return null;
};

export default SEO;
