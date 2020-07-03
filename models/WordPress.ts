export interface WordPressConfig {
    endpoint: string;
    username: string;
    password: string;
}

/* Basic representation of Post
* NOTE: Should never be exported
*/
interface WordPressPost {
    title: string;
    url: string;
    tags: string[]
    status: string
}

// NOTE: Should never be exported
// class Post implements WordPressPost {
//     status: string;
//     title: string | Object;
//     url: string;
//     tags: string[];
// }

// export interface WordPressPaper extends WordPressPost {
//     authorId: number;
//     content: string;
// }

/* 
* My best understanding is that Paper is specialized Post.
* I'm keeping Post alive just in case I need to support it.
*/
export class Paper {
    id?: number;
    title: string;
    url: string;
    tags: string[];
    status: string;
    author: number;
    content: string;
    slug: string;

    constructor(title: string, content: string) {
        this.content = content || null;
        this.title = title || null;
        this.slug = (title || '')
            .replace(/\s/g, '-')
            .toLowerCase()
        console.log('this :>> ', this);
    }

    // // Sample code - TODO: expand it to actually validate slugs, author name, html, etc using regex:
    // private validName(name: string) {
    //     if (name.length > 0 && /^[a-zA-Z]+$/.test(name)) {
    //         return true
    //     } else {
    //         throw new Error('Invalid name format')
    //     }
    // }
}

export interface WordpressSession {
    firebaseUserId: string;
    // paper: WordPressPaper;
    session?: Session;
}


/* The typed representation of a session (paper) from Firestore DB */
export class Session {
    authorId: number
    paperId: number
    status: string
    contributors: string[]
    date_uploaded: Date
    date_modified: Date
    draft: string
    code: string
    original: string
    stylesheet: string
    filename: string
    title: string
    slug: string
    excerpt: string;

    public toString = (): string => `Session: ${this.title}\n${this.code}`
}