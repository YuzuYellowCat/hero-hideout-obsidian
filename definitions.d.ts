type MarkdownPageProperties = {
    content: string;
    color: string;
    title: string;
};

type PageGalleryListItemProperties = MarkdownPageProperties & {
    isGallery: string;
};

type PageGridCardProperties = MarkdownPageProperties & {
    img: string;
    author?: string;
};

type PageWithPath<T> = T & {
    path: string;
};
