import React from "react";
import "./index.css";
import PostGridItem from "components/PostGridItem";

type PostGridProps = {};

const PostGrid: React.FC<PostGridProps> = () => {
    const posts: unknown[] = [];
    return (
        <div className="post-grid">
            {posts.map((post) => (
                <PostGridItem post={post} />
            ))}
        </div>
    );
};

export default PostGrid;
