import api from "../../context/api";
import { BIBLE_BIBLE_VERSIONS } from "../../context/Paths";


export const get_bible_versions = async (cb) => {
    try{
        const res = await api.get(BIBLE_BIBLE_VERSIONS);
        cb(res.data, true)
    }catch(e){
        cb(e, false)
    }
}


export const get_bible_books = async (payload, cb) => {
    const url = `/bible/${payload.version_id}/books/`;
    try{
        const res = await api.get(url);
        cb(res.data, true)
    }catch(e){
        cb(e, false)
    }
}


export const get_bible_books_chapter = async (payload, cb) => {
    const url = `/bible/${payload.version_id}/books/${payload.book_id}/chapters/`;
    try{
        const res = await api.get(url);
        cb(res.data, true)
    }catch(e){
        cb(e, false);
    }
}


export const get_bible_chapter_content = async(payload, cb) => {
    const url = `/bible/${payload.version_id}/chapters/${payload.chapter_id}/`;
    try{
        const res = await api.get(url);
        cb(res.data, true);
    }catch(e){
        cb(e, false);
    }
}

export const next_previous = async (payload, cb) => {
    
    const url = `/bible/${payload.version_id}/chapters/${payload.chapter_id}/${payload.route}/`

    try{
        const res = await api.get(url);
        cb(res.data, true)
    }catch(e){
        cb(e, false);
    }
}

export const search_bible = async (payload, cb) => {
    const url = `/bible/${payload.bibleId}/search/?query=${payload.query}&limit=${payload.limit}`;

    try{
        const res = await api.get(url);
        cb(res.data, true)
    }catch(e){
        cb(e, false);
    }
}

