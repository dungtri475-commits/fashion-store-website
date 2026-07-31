import API from "../constants/api.js";

class ApiServer {
    getBaseUrl() {
        return window.__API_BASE_URL__ || API.BASE_URL;
    }

    getAccessToken() {
        if (typeof window === "undefined" || !window.localStorage) {
            return null;
        }

        return (
            window.localStorage.getItem("access_token") ||
            window.localStorage.getItem("token")
        );
    }

    buildUrl(endpoint, params = {}) {
        const query = new URLSearchParams();

        Object.entries(params || {}).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item !== undefined && item !== null && item !== "") {
                        query.append(key, item);
                    }
                });
                return;
            }

            query.append(key, value);
        });

        const queryString = query.toString();
        return queryString ? `${endpoint}?${queryString}` : endpoint;
    }

    normalizeBody(body) {
        if (body === undefined || body === null) {
            return undefined;
        }

        if (body instanceof FormData) {
            return body;
        }

        return JSON.stringify(body);
    }

    async request(endpoint, options = {}) {
        const token = this.getAccessToken();
        const isFormData = options.body instanceof FormData;

        const config = {
            ...options,
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        };

        const response = await fetch(
            `${this.getBaseUrl()}${endpoint}`,
            config
        );

        const contentType = response.headers.get("content-type") || "";
        const isJsonResponse = contentType.includes("application/json");
        const data = isJsonResponse ? await response.json() : await response.text();

        if (!response.ok) {
            const message = isJsonResponse
                ? data.message || "Request failed"
                : "Request failed";

            throw new Error(message);
        }

        return data;
    }

    get(endpoint, params = {}, options = {}) {
        return this.request(this.buildUrl(endpoint, params), {
            method: "GET",
            ...options
        });
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            method: "POST",
            body: this.normalizeBody(body),
            ...options
        });
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, {
            method: "PUT",
            body: this.normalizeBody(body),
            ...options
        });
    }

    patch(endpoint, body, options = {}) {
        return this.request(endpoint, {
            method: "PATCH",
            body: this.normalizeBody(body),
            ...options
        });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: "DELETE",
            ...options
        });
    }
}

export default new ApiServer();
