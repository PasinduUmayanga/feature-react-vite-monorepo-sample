import { useCallback, useEffect, useState } from 'react'
import type { LessonId } from '../tutorials/tutorialMenu'

const storageKey = 'kepler-tutorial-completed-lessons'

function readCompletedLessons(): LessonId[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is LessonId => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function useLessonProgress() {
  const [completedLessons, setCompletedLessons] = useState<LessonId[]>(readCompletedLessons)
  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(completedLessons)) }, [completedLessons])
  const toggleLesson = useCallback((lessonId: LessonId) => setCompletedLessons((current) => current.includes(lessonId) ? current.filter((id) => id !== lessonId) : [...current, lessonId]), [])
  return { completedLessons, toggleLesson }
}
