import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';


const URL = 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg21v31v008c01un629t7whk/master'

const PostsQuery = `
query PostsQuery {
  posts {
    id
    title
    subtitle
    slug
    date
  }
}
`

type Post = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  date: string;
}

const hygraph = new GraphQLClient(URL);

const getPosts = async () => {
  const { posts } = await hygraph.request(
    PostsQuery,
  ) as { posts: Post[] };

  return posts
}

export function generateMetadata() {
  return { title: 'Olle Blog' };
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <div>
      <h1 className='capitalize text-3xl font-bold py-6  tracking-tighter'>olle blog</h1>
      <section className='flex py-4 items-center gap-4' >
        <Image className='rounded-3xl'
          src="/images/olle-pic.png"
          width={70}
          height={70}
          alt="profile picture" />
        <p>The personal blog of olle darmell</p>
      </section>
      <ul>
        {posts.reverse().map((post) => (
          <li key={post.id} className='py-4'>
            <Link href={`/blog/${post.slug}`}>
              <p className='prose-2xl font-bold capitalize text-green-500'> {post.title}</p>
              <p className='prose-sm' >{new Date(post.date).toDateString()}</p>
              <p className='prose-lg ' > {post.subtitle}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}