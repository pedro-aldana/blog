import { connect } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { get_blog } from "../../redux/actions/blog/blog";
import moment from "moment";
import DOMPurify from "dompurify";
import Navbar from "../../components/navigate/Navbar";
import Layout from "../../hocs/layouts/Layout";

const cloudName = "dfbkqdgl9";

function PostDetail({
    get_blog,
    post,
  }) {
    const fullImageUrl = post && post.thumbnail ? `https://res.cloudinary.com/${cloudName}/${post.thumbnail}` : null;
    const params = useParams();
    const slug = params.slug;
  
    useEffect(() => {
      window.scrollTo(0, 0);
      get_blog(slug);
    }, [slug]);
  
    return (
      <Layout>
        <Navbar />
        {post && post.slug === slug ? (
          <div className="pt-24">
            <div className="relative bg-gray-200">
              <div className="absolute inset-0">
                {/* Imagen */}
                {fullImageUrl && (
                  <img
                    className="h-full w-full object-cover"
                    src={fullImageUrl}
                    alt=""
                  />
                )}
                <div
                  className="absolute inset-0 bg-slate-900 opacity-60"
                  aria-hidden="true"
                />
              </div>
              <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <div className="min-w-0 flex-1 p-4 pt-8">
                  <div>
                    <span className="hover:text-orange-500 mx-1 font-medium text-white text-sm">
                      <Link to={`/category/${post.category.slug}`}>
                        {post.category.name}
                      </Link>
                    </span>{" "}
                    <span className="text-gray-300">&middot;</span>
                    <span className="mt-2 ml-2 mr-1 font-medium text-white text-sm">
                      {moment(post.published).format("LL")}
                    </span>{" "}
                    <span className="text-gray-300">&middot;</span>
                    <span className="mt-2 mx-2 font-medium text-white text-sm">
                      {post.time_read} min read
                    </span>
                    <p className="mt-4 text-lg font-regular text-white leading-8">
                      {post.description}
                    </p>
                    <a href={post.url} className="mt-4 text-lg font-regular text-white leading-8">
                      Visitar el sitio
                    </a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="relative overflow-hidden bg-white py-16">
              <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg max-w-6xl prose-indigo mx-auto mt-6 text-gray-500">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>Loading</>
        )}
      </Layout>
    );
  }

const mapStateToProps = (state) => ({
  post: state.blog.post,
});

export default connect(mapStateToProps, {
  get_blog,
})(PostDetail);
