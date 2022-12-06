const JSON_REST_BASE =
    'https://my-json-server.typicode.com/kula124/json-placeholder/';

const api = {
    login: async (email, password) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.status !== 200) {
            throw new Error('Login failed');
        }

        return res.json();
    },
    self: async (token) => {
        if (!token) {
            return null;
        }
        const res = await fetch('/api/self', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status !== 200) {
            throw new Error('Request failed');
        }

        return res.json();
    },
    getPosts: async () => {
        const res = await fetch(`${JSON_REST_BASE}posts`, {});

        if (res.status !== 200) {
            throw new Error('Request failed');
        }

        return res.json();
    },
    getPostBySlug: async (slug) => {
        const res = await fetch(`${JSON_REST_BASE}posts?slug=${slug}`, {});

        if (res.status !== 200) {
            throw new Error('Request failed');
        }

        return res.json().then((posts) => posts[0]);
    },
};

export default api;
