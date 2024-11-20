import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InvideCodepageProps {
    params: {
        inviteCode: string;
    }
}

const InvideCodepage = async ({
    params
}: InvideCodepageProps) => {
    const profile = await currentProfile();
    const { redirectToSignIn } = await auth();

    if (!profile) {
        return redirectToSignIn();
    }

    if (!params.inviteCode) {
        return redirect("/")
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server) {
        null
    }

    return redirect(`/servers/${server.id}`)
}

export default InvideCodepage