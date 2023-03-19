import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkPrism from "remark-prism";
import moment from 'moment-timezone'
// const postsDirectory = path.join(process.cwd(), 'blog')




export function getAllPostIds() {

    const Directory = path.join(process.cwd(), 'blog')
    const subdirectories = fs.readdirSync(Directory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  
    const paths = subdirectories.flatMap(subdirectory => {
      const directoryPath = path.join(Directory, subdirectory)
      const filenames = fs.readdirSync(directoryPath)
        .filter(filename => filename.endsWith('.md'))

        
  
      return filenames.map(filename => ({
        params: {
          slug: [subdirectory, filename.replace(/\.md$/, '').concat('.html')]
        }
      }))
    })
  
    return paths
}

// export function getSortedPostsData() {

//     const Directory = path.join(process.cwd(), 'blog')
//     const subdirectories = fs.readdirSync(Directory, { withFileTypes: true })
//       .filter(dirent => dirent.isDirectory())
//       .map(dirent => dirent.name)
  
//     const posts = subdirectories.flatMap(subdirectory => {
//       const directoryPath = path.join(Directory, subdirectory)
//       const filenames = fs.readdirSync(directoryPath)
//         .filter(filename => filename.endsWith('.md'))

//         const allPostsData = filenames.map(filename => {
//             // Remove ".md" from file name to get id
//             const slug = [subdirectory, filename.replace(/\.md$/, '').concat('.html')]
        
//             // Read markdown file as string
//             const fullPath = path.join(postsDirectory, [subdirectory, filename].join("\\"))
//             const fileContents = fs.readFileSync(fullPath, 'utf8')
        
//             // Use gray-matter to parse the post metadata section
//             const matterResult = matter(fileContents)
        
//             // Combine the data with the id
//             return {
//               slug,
//               ...(matterResult.data as { date: string; title: string })
//             }
//           })
//           return allPostsData.sort((a, b) => {
//             if (a.date < b.date) {
//               return 1
//             } else {
//               return -1
//             }
//           })
//     })
  
//   // Sort posts by date
//   return posts

// }

export function getSortedPostsData() {

  const path = require('path');

    const Directory = path.join(process.cwd(), 'blog')
    const subdirectories = fs.readdirSync(Directory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  
    const posts = subdirectories.flatMap(subdirectory => {
      const directoryPath = path.join(Directory, subdirectory)
      const filenames = fs.readdirSync(directoryPath)
        .filter(filename => filename.endsWith('.md'))

        const allPostsData = filenames.map(filename => {
            // Remove ".md" from file name to get id
            const slug = [subdirectory, filename.replace(/\.md$/, '').concat('.html')].join("/")
        
            // Read markdown file as string
            const fullPath = path.join(Directory, [subdirectory, filename].join("//"))
            const fileContents = fs.readFileSync(fullPath, 'utf8')

              // 统计中文字符数
            const chineseCount = fileContents.match(/[\u4e00-\u9fa5]/g).length;

            // 统计英文单词数
            const englishCount = fileContents.match(/[a-zA-Z]+/g).length;

            const wordCount = chineseCount + englishCount
        
            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents)
        
            // Combine the data with the id
            return {
              slug,
              wordCount,
              ...(matterResult.data as { date: string; title: string })
            }
          })
          return allPostsData.sort((a, b) => {
            if (a.date < b.date) {
              return 1
            } else {
              return -1
            }
          })
    })
  
  // Sort posts by date
  return posts

}


export async function getPostData(slug:any) {

  const path = require('path');
  const aPath = path.join(process.cwd(), 'blog')
  const idjoin = slug.toString().split(",").join("//").replace(/\.html$/, '')
  const id = path.join(idjoin);
  const fullPath = path.join(aPath, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const chineseChars = fileContents.match(/[\u4e00-\u9fa5]/g);

  // 统计中文字符数
  const chineseCount = fileContents.match(/[\u4e00-\u9fa5]/g).length;

  // 统计英文单词数
  const englishCount = fileContents.match(/[a-zA-Z]+/g).length;

  const wordCount = chineseCount + englishCount
  console.log(`文章字数为：${wordCount}`);
  console.log(`中文字符个数：${chineseCount}`);
  console.log(`英文单词个数：${englishCount}`);
  console.log(`中英文字符总数：${chineseCount + englishCount}`);

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const date = new Date(matterResult.data.date).toISOString()

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkPrism, { plugins: ["line-numbers"] })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  
  const baseUrl = 'https://fanmau.github.io';
  const imgRegex = /<img.*?src="(.*?)"/g;
  let match: any[];
  while ((match = imgRegex.exec(contentHtml)) !== null) {
    const imgPath = match[1];
    const imgUrl = `${baseUrl}${imgPath}`;
    console.log(imgUrl);
  }

  // const imgRegex = /<img.*?src="(.*?)"/g;

  // // 获取所有图片链接
  // const imgLinks = [];
  // let match: any[];
  // while ((match = imgRegex.exec(contentHtml)) !== null) {
  //   imgLinks.push(match[1]);
  // }

  // // 输出所有图片链接
  // console.log(imgLinks);

  // const mtime = fs.stat(fullPath, (err, stats) => {
  //   if (err) throw err;
  //   console.log(`Last modified: ${stats.mtime}`);
  // });
  
//   const filePath = fullPath;

// try {
//   const stats = fs.statSync(filePath);
//   const lastModified = stats.mtime;
//   console.log(`The file was last modified on ${lastModified}`);
// } catch (err) {
//   console.error(err);
// }

//   const mtime = lastModified

  const filePath = fullPath;
  const fileStat = fs.statSync(filePath);
  const mtime = fileStat.mtime.toISOString();
  const birthtime = fileStat.birthtime.toISOString();

  // const amtime = moment.tz(fileStat.mtime, 'Asia/Shanghai').format('YYYY-MM-DDTHH:mm:ss.sssZ');
  // const actime = moment.tz(fileStat.birthtime, 'Asia/Shanghai').format('YYYY-MM-DDTHH:mm:ssZ');
  
  console.log(birthtime);
  // console.log(`Modified Time: ${amtime}`);
  // console.log(`Created Time: ${actime}`);
  // Combine the data with the id and contentHtml
  return {
    birthtime,
    mtime,
    slug,
    wordCount,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; })
  }
}

const contentDirectory = 'blog'; // 替换成你的文章目录

export const calculateWordCount = (): number => {

let totalWordCount = 0;

// 遍历文章目录下所有的 .md 文件
const readDirectory = (dir: string) => {
  fs.readdirSync(dir).forEach(item => {
    // 忽略文件名以 "." 开头的文件或文件夹
    if (item[0] === '.')
      return;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if(stats.isFile() && itemPath.endsWith('.md')) { // 如果是 .md 文件
      const fileContents = fs.readFileSync(itemPath, 'utf8');

      // 统计中文字符数
      const chineseCount = fileContents.match(/[\u4e00-\u9fa5]/g)?.length || 0;

      // 统计英文单词数
      const englishCount = fileContents.match(/[a-zA-Z]+/g)?.length || 0;

      totalWordCount += chineseCount + englishCount;
    } else if(stats.isDirectory()) { // 如果是文件夹
      readDirectory(itemPath);
    }
  });
}

readDirectory(contentDirectory);


  return totalWordCount;
};
console.log(`全站总字数为：${calculateWordCount()}`);