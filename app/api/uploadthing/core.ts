import { auth } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new UploadThingError("Unauthorized");
    }

    return { userId }
}

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
                // This code RUNS ON YOUR SERVER after upload
                console.log("Upload complete for userId:", metadata.userId);
            
                console.log("file url", file.url);
            
                // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
                return { uploadedBy: metadata.userId, url: file.url };
            }
        ),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
                // This code RUNS ON YOUR SERVER after upload
                console.log("Upload complete for userId:", metadata.userId);
            
                console.log("file url", file.url);
            
                // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
                return { uploadedBy: metadata.userId, url: file.url };
            }
        )
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
