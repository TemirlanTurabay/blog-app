import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default async function BlogIndex() {
  const filePath = path.join(process.cwd(), 'data', 'blogs.json');
  const jsonData = await fs.promises.readFile(filePath);
  const blogs = JSON.parse(jsonData);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.slug}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
