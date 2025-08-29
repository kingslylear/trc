import { base } from '@/config'

// Checks if normalized path matches a specific page type
function isPageType(path: string, prefix: string = '') {
  const pathWithoutBase = base && path.startsWith(base)
    ? path.slice(base.length)
    : path

  // Removes leading and trailing slashes from the path
  const normalizedPath = pathWithoutBase.replace(/^\/|\/$/g, '')

  if (prefix === '') {
    return normalizedPath === ''
  }

  return normalizedPath.startsWith(prefix)
}

export function isHomePage(path: string) {
  return isPageType(path)
}

export function isPostPage(path: string) {
  return isPageType(path, 'posts')
}

export function isTagPage(path: string) {
  return isPageType(path, 'tags')
}

export function isAboutPage(path: string) {
  return isPageType(path, 'about')
}

// Simple path helper - returns path with base prefix
function getLocalizedPath(targetPath: string): string {
  const normalizedPath = targetPath.replace(/^\/|\/$/g, '')
  const localizedPath = normalizedPath === '' ? '/' : `/${normalizedPath}/`
  return base ? `${base}${localizedPath}` : localizedPath
}

// Returns page context with page types and localization helper
export function getPageInfo(path: string) {
  const isHome = isHomePage(path)
  const isPost = isPostPage(path)
  const isTag = isTagPage(path)
  const isAbout = isAboutPage(path)

  return {
    isHome,
    isPost,
    isTag,
    isAbout,
    getLocalizedPath,
  }
}
