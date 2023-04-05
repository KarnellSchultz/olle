import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';


const HYGRAPH_URL = 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg21v31v008c01un629t7whk/master'
const hygraph = new GraphQLClient(HYGRAPH_URL);

type Post = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  date: string;
}

type Profile = {
  heading: string;
  profilePic: {
    url: string;
  }
}

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

const ProfileQuery = `query ProfileQuery {
  profiles {
    heading
    profilePic {
      url
    }
  }
}`


const getPosts = async () => {
  const { posts } = await hygraph.request(
    PostsQuery,
  ) as { posts: Post[] };

  return posts
}

const getProfile = async () => {
  const { profiles } = await hygraph.request(
    ProfileQuery,
  ) as { profiles: Profile[] };
  return profiles[0]
}


export default async function Page() {
  const [posts, profile] = await Promise.all([getPosts(), getProfile()])

  return (
    <div>
      <h1 className='capitalize text-3xl font-bold py-6  tracking-tighter'>olle blog</h1>
      <section className='flex py-4 items-center gap-4' >
        <Image className='rounded-3xl'
          src={profile.profilePic.url}
          width={70}
          height={70}
          alt="profile picture" />
        <p>{profile.heading}</p>
      </section>
      <ul>
        {posts.reverse().map((post: Post) => (
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

export function generateMetadata() {
  return { title: 'Olle Blog' };
}