export const scrollToText = (hash: string) => {
    const parsedHash = hash.slice(1).toLowerCase();
    const headers = ["1", "2", "3", "4", "5", "6"].flatMap((num) => {
        return [...document.getElementsByTagName(`h${num}`)];
    });
    for (const element of headers) {
        const elementLink = element.textContent
            ?.replaceAll(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
            .replaceAll(" ", "%20")
            .toLowerCase();
        if (elementLink === parsedHash) {
            element.scrollIntoView();
        }
    }
};

export const isPageReleased = (page: GeneralPageType) => {
    // No date, meaning it can't be in the future
    if (!page.date) {
        return true;
    }
    return page.date.valueOf() <= Date.now().valueOf();
};
