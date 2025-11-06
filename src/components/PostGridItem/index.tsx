import React from "react";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";

type PostGridItemProps = {
    post: any;
};

const PostGridItem: React.FC<PostGridItemProps> = ({ post }) => {
    const [ref, loaded, onLoad] = useImageLoaded();

    return (
        <button className="post-grid-item">
            <div className="post-thumbnail-wrapper">
                {!loaded && <LoadingBox className="post-thumbnail-loader" />}
                <img
                    src={post.imageName}
                    alt={post.altText}
                    ref={ref}
                    onLoad={onLoad}
                />
            </div>
            <span className="post-title">{post.title}</span>
        </button>
    );
};

export default PostGridItem;
