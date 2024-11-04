
import { db } from "./db";
import { Profile } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

export const initialProfile = async (): Promise<Profile | void> => {
    const user = await currentUser()
    const { redirectToSignIn } = await auth();

    if (user) {
        const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        })

        if (profile) {
            return profile;
        }

        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        })

        return newProfile;
    }

    return redirectToSignIn();
};
