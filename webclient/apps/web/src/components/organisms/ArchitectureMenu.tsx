import { useState } from 'react'
import { SourceFileViewer } from './SourceFileViewer'
import type { LessonId, TutorialMenuFile, TutorialMenuNode } from '../../tutorials/tutorialMenu'
import { tutorialLessons, tutorialMenu } from '../../tutorials/tutorialMenu'

interface ArchitectureMenuProps {
  activeLesson: LessonId
  completedLessons: readonly LessonId[]
}

function isMenuFile(node: TutorialMenuNode): node is TutorialMenuFile {
  return typeof node !== 'string' && 'description' in node && !('children' in node)
}

function MenuNode({ node, activeLesson, completedLessons, folderPath, onSelectFile }: Readonly<{ node: TutorialMenuNode, folderPath: string, onSelectFile: (path: string, description: string) => void } & ArchitectureMenuProps>) {
  if (typeof node === 'string') {
    const lesson = tutorialLessons[node]
    const complete = completedLessons.includes(node)
    return <li><a href={`#/tutorials/${node}`} aria-current={activeLesson === node ? 'page' : undefined}><span aria-hidden="true">{complete ? '✓' : '·'}</span><code>{lesson.path.split('/').at(-1)}</code><small>{lesson.title}</small></a></li>
  }

  if (isMenuFile(node)) {
    const path = `${folderPath}${node.label}`
    return <li className="architecture-menu__file" title={node.description}><button type="button" onClick={() => onSelectFile(path, node.description)}><span>▧</span><code>{node.label}</code><small>{node.description}</small></button></li>
  }

  const childPath = node.label === 'webclient' ? folderPath : `${folderPath}${node.label}/`
  return <li className="architecture-menu__folder" title={node.description}><span>▾ {node.label}/</span>{node.description ? <small>{node.description}</small> : null}<ul>{node.children.map((child) => <MenuNode key={typeof child === 'string' ? child : child.label} node={child} activeLesson={activeLesson} completedLessons={completedLessons} folderPath={childPath} onSelectFile={onSelectFile} />)}</ul></li>
}

export function ArchitectureMenu(props: Readonly<ArchitectureMenuProps>) {
  const [selectedFile, setSelectedFile] = useState<{ path: string, description: string } | null>(null)
  return <nav className="architecture-menu" aria-label="Architecture learning menu"><span className="architecture-menu__label">Repository lessons</span><p className="architecture-menu__hint">Select a file to read its real code.</p><ul>{tutorialMenu.map((node) => <MenuNode key={node.label} node={node} {...props} folderPath="" onSelectFile={(path, description) => setSelectedFile({ path, description })} />)}</ul>{selectedFile ? <SourceFileViewer key={selectedFile.path} {...selectedFile} onClose={() => setSelectedFile(null)} /> : null}</nav>
}
