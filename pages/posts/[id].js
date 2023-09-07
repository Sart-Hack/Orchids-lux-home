import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useEffect, useState } from 'react';




export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  // Generate unique IDs for headings in the content
  useEffect(() => {
    const content = document.getElementById('post-content');
    if (content) {
      const headings = content.querySelectorAll('h2, h3, h4, h5, h6');
      headings.forEach((heading) => {
        const text = heading.textContent;
        const id = text.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;
      });
    }
  }, []);

  // Function to handle smooth scrolling when clicking on index links
  const scrollToHeading = (event, headingId) => {
    event.preventDefault();
    const headingElement = document.getElementById(headingId);
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    // This will calculate how many pixels the page is vertically
    const winScroll = document.documentElement.scrollTop;
    // This is responsible for subtracticing the total height of the page - where the users page is scrolled to
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // This will calculate the final total of the percentage of how much the user has scrolled.
    const scrolled = (winScroll / height) * 100;
    console.log('scrollTop:', scrolled); // Add this line for debugging


    setScrollTop(scrolled);
  };


  useEffect(() => {
    // Fires when the document view has been scrolled
    window.addEventListener("scroll", onScroll);

    // 
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={utilStyles.progressMainWrapper}>
          <div
            className={utilStyles.progressMainStyle}
            style={{ width: `${scrollTop}%` }}
          ></div>
        </div>
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
            <h3>Written By : {postData.author}</h3>
          </div>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>  
          {/* Index containing all headings */}
          <div>
            <h2>Table of Contents</h2>
            <ul>
              {postData.headings.map((heading) => (
                <li key={heading.text}>
                  <a
                    href={`#${heading.slug}`}
                    onClick={(e) => scrollToHeading(e, heading.slug)}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Post content with an ID */}
          <div id="post-content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    </>
  );
}


export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }