'use client';

import { useState, useMemo } from 'react';
import { MobileResponsiveCourseCard } from '@/components/shared/MobileResponsiveCourseCard';
import { MobileResponsiveCategoryFilter } from './MobileResponsiveCategoryFilter';
import { CourseGrid } from '@/components/layout/MobileResponsiveGrid';
import { BookOpen, Users, Award, Clock } from 'lucide-react';
import { GetCoursesQueryResult } from '../../../sanity.types';

interface MobileResponsiveHomepageContentProps {
  courses: GetCoursesQueryResult;
}

export function MobileResponsiveHomepageContent({
  courses,
}: MobileResponsiveHomepageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from courses
  const categories = useMemo(() => {
    return courses.reduce((acc: string[], course) => {
      if (course.category?.name && !acc.includes(course.category.name)) {
        acc.push(course.category.name);
      }
      return acc;
    }, []);
  }, [courses]);

  // Count unique instructors
  const uniqueInstructors = useMemo(() => {
    return new Set(courses.map(course => course.instructor?.name)).size;
  }, [courses]);

  // Filter courses based on selected category
  const filteredCourses = useMemo(() => {
    if (!selectedCategory) return courses;
    return courses.filter(course => course.category?.name === selectedCategory);
  }, [courses, selectedCategory]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Course Catalogue
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Explore our comprehensive collection of advanced technology
              courses designed for modern learners
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <MobileResponsiveCategoryFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />

        {/* Stats Section */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-200 dark:border-gray-700">
              <BookOpen className="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 dark:text-gray-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {filteredCourses.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                courses available
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-200 dark:border-gray-700">
              <Award className="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 dark:text-gray-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {categories.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                categories
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-200 dark:border-gray-700">
              <Users className="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 dark:text-gray-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {uniqueInstructors}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                instructors
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-200 dark:border-gray-700">
              <Clock className="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 dark:text-gray-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {filteredCourses.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                total courses
              </div>
            </div>
          </div>
        </div>

        {/* Featured Courses Section */}
        <div className="py-6 sm:py-8 lg:py-12">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCategory
                    ? `${selectedCategory} Courses`
                    : 'Featured Courses'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? 's' : ''} available
                </p>
              </div>

              {/* Mobile: Show selected category prominently */}
              {selectedCategory && (
                <div className="sm:hidden">
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                    {selectedCategory}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <CourseGrid className="pb-8 sm:pb-12">
              {filteredCourses.map(course => (
                <MobileResponsiveCourseCard
                  key={course._id}
                  course={course}
                  href={`/courses/${course.slug}`}
                  variant="featured"
                />
              ))}
            </CourseGrid>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedCategory
                  ? `No courses available in the "${selectedCategory}" category.`
                  : 'No courses are currently available.'}
              </p>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange(null)}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View All Courses
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
