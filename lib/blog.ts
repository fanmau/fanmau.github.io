import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkPrism from "remark-prism";
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
            const fullPath = path.join(Directory, [subdirectory, filename].join("\\"))
            const fileContents = fs.readFileSync(fullPath, 'utf8')
        
            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents)
        
            // Combine the data with the id
            return {
              slug,
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

  const aPath = path.join(process.cwd(), 'blog')
  const id = slug.toString().split(",").join("\\").replace(/\.html$/, '')
  const fullPath = path.join(aPath, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkPrism, { plugins: ["line-numbers"] })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()


  
  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}
