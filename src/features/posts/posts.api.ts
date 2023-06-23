import { instance } from "../../components/common/api/common.api"

export const postsApi = {
    getPosts() {
        return instance.get("")
    },
}

export type ResponsePosts = {}
