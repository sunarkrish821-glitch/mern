import z from "zod";

export const BlogCreateDTO = z.object({
    title: z.string().min(3).max(200),
    summary: z.string().min(10),
    description: z.string().min(20),
    category: z.enum(["Technology", "Health", "Lifestyle", "Education", "Other"]),
    status: z.enum(["draft", "published"]).optional().default("draft"),
});