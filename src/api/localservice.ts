
class BookData {
  id: string = "";
  name: string = "";
  poster?: string = "";
  postdate?: string = "";
  title: string = "";
  author: string = "";
  publisher: string = "";
  pubdate: string = "";
  desc: string = "";
  image: string = "";
  images: Array<string> = [];
}

var booklist: Array<BookData> = [
  {
    id: "124",
    name: "A book",
    poster: "Poster aaaa",
    postdate: "2002.4.4",
    title: "Bookname hhgf",
    author: "Author hg",
    publisher: "Pub hgrfe",
    pubdate: "2022.5.4",
    desc: "None",
    image:
      "https://cdn.luogu.com.cn/fe/logo.png?0fdd294ff62e331d2f70e1a37ba4ee02",
    images: [
      "https://cdn.luogu.com.cn/fe/logo.png?0fdd294ff62e331d2f70e1a37ba4ee02",
    ],
  },
  {
    id: "122",
    name: "B book",
    title: "Bookname dsfgfds",
    author: "Author2",
    publisher: "Pubbb",
    pubdate: "2022.5.4",
    poster: "Poster aaaa",
    postdate: "2002.4.4",
    desc: "None",
    image:
      "https://cdn.luogu.com.cn/fe/logo.png?0fdd294ff62e331d2f70e1a37ba4ee02",
    images: [
      "https://cdn.luogu.com.cn/fe/logo.png?0fdd294ff62e331d2f70e1a37ba4ee02",
    ],
  },
  {
    id: "0",
    name: "B book",
    title: "Bookname hgfgbng",
    author: "Author2",
    publisher: "Pubbb",
    pubdate: "2022.5.4",
    desc: "None",
    image:
      "https://cdn.luogu.com.cn/fe/logo.png?0fdd294ff62e331d2f70e1a37ba4ee02",
    images: [
      "https://cdn.luogu.com.cn/fe/logo.png?0fdd294ff62e331d2f70e1a37ba4ee02",
    ],
  },
];

export function queryBookList(params: { content?: string }): Array<BookData> {
  console.log("queryBookList");
  if (params?.content) {
    let c: string = params.content;
    console.log(booklist.filter(t => t.id?.includes(c) || t.name?.includes(c) || t.title?.includes(c) || t.author?.includes(c) || t.publisher?.includes(c)));
    return booklist.filter(t => t.id?.includes(c) || t.name?.includes(c) || t.title?.includes(c) || t.author?.includes(c) || t.publisher?.includes(c));
  }
  return booklist;
}

export function queryBook(bookid: string): BookData | undefined {
  console.log("queryBook");
  return booklist.find(t => t.id == bookid);
}