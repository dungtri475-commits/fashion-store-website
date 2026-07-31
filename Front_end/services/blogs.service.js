import api from "./api.js";

const BLOG_ENDPOINT = "/blogs";

function isFileList(value) {
    return typeof FileList !== "undefined" && value instanceof FileList;
}

function appendValue(formData, key, value) {
    if (value === undefined || value === null || value === "") {
        return;
    }

    if (isFileList(value)) {
        Array.from(value).forEach((item) => appendValue(formData, key, item));
        return;
    }

    if (Array.isArray(value)) {
        value.forEach((item) => appendValue(formData, key, item));
        return;
    }

    formData.append(key, value);
}

function buildBlogFormData(data = {}) {
    if (data instanceof FormData) {
        return data;
    }

    const formData = new FormData();

    appendValue(formData, "title", data.title);
    appendValue(formData, "shortDescription", data.shortDescription);
    appendValue(formData, "content", data.content);
    appendValue(formData, "category", data.category);
    appendValue(formData, "status", data.status);
    appendValue(formData, "thumbnail", data.thumbnail);
    appendValue(formData, "images", data.images);

    if (data.tags !== undefined) {
        formData.append("tags", JSON.stringify(data.tags || []));
    }

    return formData;
}

class BlogService {
    getBlogs(params = {}) {
        return api.get(BLOG_ENDPOINT, params);
    }

    searchBlogs(keyword, params = {}) {
        return api.get(`${BLOG_ENDPOINT}/search`, {
            keyword,
            ...params
        });
    }

    getBlogDetail(slug) {
        return api.get(`${BLOG_ENDPOINT}/${slug}`);
    }

    getRelatedBlogs(slug, params = {}) {
        return api.get(`${BLOG_ENDPOINT}/${slug}/related`, params);
    }

    getLatestBlogs(params = {}) {
        return api.get(`${BLOG_ENDPOINT}/latest`, params);
    }

    getPopularBlogs(params = {}) {
        return api.get(`${BLOG_ENDPOINT}/popular`, params);
    }

    createBlog(data) {
        return api.post(BLOG_ENDPOINT, buildBlogFormData(data));
    }

    updateBlog(id, data) {
        return api.put(`${BLOG_ENDPOINT}/${id}`, buildBlogFormData(data));
    }

    deleteBlog(id) {
        return api.delete(`${BLOG_ENDPOINT}/${id}`);
    }

    publishBlog(id) {
        return api.patch(`${BLOG_ENDPOINT}/${id}/publish`);
    }

    unpublishBlog(id) {
        return api.patch(`${BLOG_ENDPOINT}/${id}/unpublish`);
    }

    increaseView(id) {
        return api.patch(`${BLOG_ENDPOINT}/${id}/view`);
    }

    uploadBlogAssets(data) {
        const formData = new FormData();

        appendValue(formData, "thumbnail", data?.thumbnail);
        appendValue(formData, "images", data?.images);

        return api.post(`${BLOG_ENDPOINT}/upload`, formData);
    }
}

export default new BlogService();
