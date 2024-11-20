import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMenbersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
}