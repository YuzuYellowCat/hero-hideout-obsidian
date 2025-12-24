type MarkdownPageProperties = {
    content: string;
    color: string;
    title: string;
    date?: Date;
    level: ContentLevel;
};

type GalleryPageUniqueProperties = {
    isGallery: string;
};

type GalleryPageProperties = MarkdownPageProperties &
    GalleryPageUniqueProperties;

type ImagePageUniqueProperties = {
    img: string;
    date: Date;
    author?: string;
};

type ImagePageProperties = MarkdownPageProperties & ImagePageUniqueProperties;

type GeneralPageType =
    | MarkdownPageProperties
    | ImagePageProperties
    | GalleryPageProperties;

type PageWithPath<T> = T & {
    path: string;
};
