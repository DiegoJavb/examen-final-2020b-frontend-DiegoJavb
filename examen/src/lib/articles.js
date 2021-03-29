import api from "./api";

async function getById(id){
    return await api.get(`/articles/${id}`)
}
export const Article = {
    getById,
};