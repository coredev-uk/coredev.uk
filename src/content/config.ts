import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.string().array().optional(),
    }),
});

const project = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tech: z.string().array().optional(),
        github: z.string().optional(),
        url: z.string().optional(),
        loadFactor: z.number(),
    }),
});

const experience = defineCollection({
    type: "content",
    schema: z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        company: z.string(),
        title: z.string(),
        tech: z.string().array().optional(),
    }),
});

export const collections = { blog, project, experience };