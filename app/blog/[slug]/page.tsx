import { GraphQLClient } from 'graphql-request';
import Link from 'next/link';

const URL = 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg21v31v008c01un629t7whk/master'

type BlogPost = {
    content: {
        text: string;
        html: string;
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
            html
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
    const post = await getProduct(params.slug.toLocaleLowerCase())
    return (
        <>
            <Link href={"/"} className='cursor-pointer' >
                <h1 className='capitalize tracking-tighter text-2xl font-bold pt-10'>olle blog</h1>
            </Link>
            <div className='py-4'>
                <h2 className='capitalize text-4xl font-bold pt-4 text-green-500'>
                    {post.title}</h2>
                <p className=''>{post.date}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content.html }}
                className="[&>*]:pt-2 lg:prose-xl dark:prose-invert " />
        </>
    )
}

