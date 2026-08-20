import fs from "node:fs/promises";

export function getUploadedFilePath(file) {
    return `uploads/blogs/${file.filename}`;
}

export async function cleanupUploadedFiles(req) {
    const uploadedFiles = Object.values(req.files || {})
        .flat()
        .filter(Boolean);

    await Promise.all(
        uploadedFiles.map(async (file) => {
            try {
                await fs.unlink(file.path);
            } catch {
                // Ignore cleanup failures to keep validation deterministic.
            }
        })
    );
}
