type MarkdownPageProperties = {
    content: string;
    color: string;
    title: string;
    date?: Date;
};

type PageGalleryListItemProperties = MarkdownPageProperties & {
    isGallery: string;
};

type PageGridCardProperties = MarkdownPageProperties & {
    img: string;
    date: Date;
    author?: string;
};

type PageWithPath<T> = T & {
    path: string;
};
