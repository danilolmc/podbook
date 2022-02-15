import { PodbookCategory } from "../entity/PodbookCategory";
import { User } from "../entity/User";

export interface PodbookModel {

    bannerImage: string
    bannerTitle: string
    description: string
    category: PodbookCategory;
    user_owner: User,
    audio: string;
}