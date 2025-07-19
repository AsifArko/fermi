'use server';

import { completeLessonById } from '@/sanity/lib/lessons/completeLessonById';

export async function completeLessonAction(
  lessonId: string,
  clerkId: string
): Promise<void> {
  try {
    await completeLessonById({ lessonId, clerkId });
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
}
