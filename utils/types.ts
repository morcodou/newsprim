import { Bundle, BundleTag, FeedTag, User } from "@prisma/client"

export enum ItemType {
    BundleType = 'BundleType',
    FeedType = 'FeedType'
};

export type FeedObject = {
    id?: string;
    name: string;
    url: string;
    tags: FeedTag[];
    bundles?: Bundle[];
    likes?: User[];
    author?: User;
}

export type BundleObject = {
    id?: string;
    name: string;
    description: string;
    tags: BundleTag[];
    feeds: FeedObject[];
    likes?: User[];
    author?: User;
}