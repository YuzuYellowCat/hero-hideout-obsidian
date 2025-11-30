# Basic Website Structure Idea

All of this is built via markdown pages in `src/website-content/pages`

-   Web content
    -   Home
        -   index - Home page text
            -   About me section
            -   Link to default gallery
    -   Creatures
        -   index - grid of all creatures that are not hidden
        -   (creature id)
            -   for mine, a ref of creature, button that takes them to a gallery that includes that creature
            -   for friends, just write whatever makes sense
    -   Gallery
        -   index - show a gallery of all posts
            -   route query params into the gallery as props
        -   Post
            -   (post id) - the specific post
                -   can link to creatures who are friends
                -   has tags that can be filtered on
    -   Blog (?)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
