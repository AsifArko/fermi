import { type SchemaTypeDefinition } from "sanity";
import { studentType } from "./studentType";
import { blockContent } from "./blockContent";
import { categoryType } from "./categoryType";
import { courseType } from "./courseType";
import { enrollmentType } from "./enrollmentType";
import { instructorType } from "./instructorType";
import { lessonCompletionType } from "./lessonCompletionType";
import { moduleType } from "./moduleType";
import { lessonType } from "./lessonType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    categoryType,
    courseType,
    enrollmentType,
    instructorType,
    lessonCompletionType,
    lessonType,
    moduleType,
    studentType,
  ],
};
