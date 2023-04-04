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
      <h1 className='capitalize text-4xl font-bold py-8 '>olle blog</h1>
      <section className='flex py-8 items-center' >
        <Image className='rounded-3xl mx-3'
          src="/images/olle-pic.png"
          width={70}
          height={70}
          alt="profile picture" />
        <p>the personal blog of olle darmell</p>
      </section>
      <ul>
        {
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <p className='text-2xl font-bold capitalize'> {post.title}</p>
                <p>{new Date(post.date).toDateString()}</p>
                <p className='text-xl ' > {post.subtitle}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}