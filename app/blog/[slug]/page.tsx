import { GraphQLClient } from 'graphql-request';
import Link from 'next/link';

const URL = 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg21v31v008c01un629t7whk/master'

type BlogPost = {
    content: {
        text: string;
    };
    date: string;
    slug: string;
    subtitle: string;
    title: string;
}

const BlogPostQuery = `
query BlogPostQuery($slug: String!) {
    post(where: {slug: $slug}) {
        content {
            text
        }
        date
        slug
        subtitle
        title
    }
}
`

type Params = {
    params: {
        slug: string;
    }
}
const hygraph = new GraphQLClient(URL);
const getProduct = async (slug: Params["params"]["slug"]) => {
    const { post } = await hygraph.request(
        BlogPostQuery,
        { slug }
    ) as { post: BlogPost };

    return post
}



export default async function BlogPage({ params }: Params) {
    const post = await getProduct(params.slug)
    return (
        <>
            <h1 className='capitalize text-2xl font-bold py-10'>olle blog</h1>
            <Link href="/">Home</Link>
            <h1
                className='text-6xl font-bold text-center text-cyan-300'
            >{post.title}</h1>
            <h1>{post.content.text}</h1>
        </>
    )
}

