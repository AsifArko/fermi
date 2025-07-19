'use server';

import { getLessonCompletionStatus } from '@/sanity/lib/lessons/getLessonCompletionStatus';

export async function getLessonCompletionStatusAction(
  lessonId: string,
  clerkId: string
): Promise<boolean> {
  try {
    const status = await getLessonCompletionStatus(lessonId, clerkId);
    return status;
  } catch (error) {
    console.error('Error fetching lesson completion status:', error);
    return false;
  }
}
