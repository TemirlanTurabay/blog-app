import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export default function BlogPost({ blog }) {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.content.substring(0, 150)} />
      </Head>
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'blogs.json');
  const jsonData = await fs.promises.readFile(filePath);
  const blogs = JSON.parse(jsonData);

  const paths = blogs.map(blog => ({
    params: { slug: blog.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'blogs.json');
  const jsonData = await fs.promises.readFile(filePath);
  const blogs = JSON.parse(jsonData);
  const blog = blogs.find(blog => blog.slug === params.slug);

  return { props: { blog } };
}
