export function HomePage() {
    return `
        <section class="home-page">
            <div class="home-hero">
                <p class="home-eyebrow">Open Fashion</p>
                <h1>Editorial stories for the modern wardrobe.</h1>
                <p class="home-copy">
                    Explore the latest journal entries, styling notes, and campaign stories
                    loaded directly from the blog backend.
                </p>
                <div class="home-actions">
                    <a class="home-button" href="#/blog">Open Blog Journal</a>
                    <a class="home-link" href="#/blog/latest">See Latest Posts</a>
                </div>
            </div>

            <section class="home-preview">
                <div class="home-preview__card">
                    <span>Live backend integration</span>
                    <strong>Blog list</strong>
                    <p>Reads real data from <code>/api/blogs</code> with paging and filtering support.</p>
                </div>
                <div class="home-preview__card">
                    <span>Editorial detail</span>
                    <strong>Blog detail</strong>
                    <p>Loads real article content from <code>/api/blogs/:slug</code>.</p>
                </div>
                <div class="home-preview__card">
                    <span>More modules ready</span>
                    <strong>Popular and related</strong>
                    <p>Frontend can now consume the latest, popular, and related blog endpoints.</p>
                </div>
            </section>
        </section>
    `;
}
