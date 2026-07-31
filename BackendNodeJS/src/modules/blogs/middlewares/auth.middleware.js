import jwt from "jsonwebtoken";

import env from "../../../config/env.js";
import { createHttpError } from "../utils/http-error.js";

function extractToken(req) {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
        return null;
    }

    return authHeader.slice(7).trim();
}

function normalizeRoles(user = {}) {
    const rawRoles = user.roles ?? user.role ?? [];

    if (Array.isArray(rawRoles)) {
        return rawRoles.map((role) => String(role).toLowerCase());
    }

    if (!rawRoles) {
        return [];
    }

    return [String(rawRoles).toLowerCase()];
}

export function hasAnyRole(user, allowedRoles = []) {
    const normalizedUserRoles = normalizeRoles(user);
    const normalizedAllowedRoles = allowedRoles.map((role) => String(role).toLowerCase());

    return normalizedAllowedRoles.some((role) => normalizedUserRoles.includes(role));
}

export function getAuthenticatedUserId(user = {}) {
    return user.id || user.userId || user._id || user.sub || null;
}

export function optionalAuthenticate(req, res, next) {
    try {
        const token = extractToken(req);

        if (!token) {
            next();
            return;
        }

        req.user = jwt.verify(token, env.JWT_SECRET);
        next();
    } catch {
        next(createHttpError("Invalid access token.", 401));
    }
}

export function authenticate(req, res, next) {
    try {
        const token = extractToken(req);

        if (!token) {
            throw createHttpError("Authentication required.", 401);
        }

        req.user = jwt.verify(token, env.JWT_SECRET);
        next();
    } catch (error) {
        next(error.status ? error : createHttpError("Invalid access token.", 401));
    }
}

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            next(createHttpError("Authentication required.", 401));
            return;
        }

        if (!hasAnyRole(req.user, allowedRoles)) {
            next(createHttpError("You do not have permission to manage blogs.", 403));
            return;
        }

        next();
    };
}
