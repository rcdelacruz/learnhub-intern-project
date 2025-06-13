import { relations } from 'drizzle-orm';
import {
  users,
  accounts,
  sessions,
  students,
  instructors,
  courses,
  courseModules,
  lessons,
  enrollments,
  courseProgress,
  lessonProgress,
  courseReviews,
  achievements,
  certificates,
  instructorReviews,
  payouts,
  assessments,
  questions,
  assessmentAttempts,
  answers,
  messages,
  forumPosts,
  forumReplies,
  payments,
  subscriptions,
  subscriptionPlans,
} from './index';

// ============================================================================
// USER RELATIONS
// ============================================================================

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  studentProfile: one(students, {
    fields: [users.id],
    references: [students.userId],
  }),
  instructorProfile: one(instructors, {
    fields: [users.id],
    references: [instructors.userId],
  }),
  enrollments: many(enrollments),
  assessmentAttempts: many(assessmentAttempts),
  sentMessages: many(messages, { relationName: 'sentMessages' }),
  forumPosts: many(forumPosts),
  forumReplies: many(forumReplies),
  payments: many(payments),
  courseReviews: many(courseReviews),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// STUDENT RELATIONS
// ============================================================================

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  enrollments: many(enrollments, {
    relationName: 'studentEnrollments',
  }),
  progress: many(courseProgress),
  achievements: many(achievements),
  certificates: many(certificates),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  student: one(students, {
    fields: [achievements.studentId],
    references: [students.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  student: one(students, {
    fields: [certificates.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [certificates.courseId],
    references: [courses.id],
  }),
}));

// ============================================================================
// INSTRUCTOR RELATIONS
// ============================================================================

export const instructorsRelations = relations(instructors, ({ one, many }) => ({
  user: one(users, {
    fields: [instructors.userId],
    references: [users.id],
  }),
  courses: many(courses),
  reviews: many(instructorReviews),
  payouts: many(payouts),
}));

export const instructorReviewsRelations = relations(instructorReviews, ({ one }) => ({
  instructor: one(instructors, {
    fields: [instructorReviews.instructorId],
    references: [instructors.id],
  }),
  course: one(courses, {
    fields: [instructorReviews.courseId],
    references: [courses.id],
  }),
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
  instructor: one(instructors, {
    fields: [payouts.instructorId],
    references: [instructors.id],
  }),
}));

// ============================================================================
// COURSE RELATIONS
// ============================================================================

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(instructors, {
    fields: [courses.instructorId],
    references: [instructors.id],
  }),
  modules: many(courseModules),
  enrollments: many(enrollments),
  reviews: many(courseReviews),
  progress: many(courseProgress),
  assessments: many(assessments),
  certificates: many(certificates),
  instructorReviews: many(instructorReviews),
  forumPosts: many(forumPosts),
  payments: many(payments),
}));

export const courseModulesRelations = relations(courseModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseModules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(courseModules, {
    fields: [lessons.moduleId],
    references: [courseModules.id],
  }),
  progress: many(lessonProgress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const courseProgressRelations = relations(courseProgress, ({ one, many }) => ({
  student: one(students, {
    fields: [courseProgress.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [courseProgress.courseId],
    references: [courses.id],
  }),
  lessons: many(lessonProgress),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  courseProgress: one(courseProgress, {
    fields: [lessonProgress.courseProgressId],
    references: [courseProgress.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const courseReviewsRelations = relations(courseReviews, ({ one }) => ({
  course: one(courses, {
    fields: [courseReviews.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [courseReviews.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// ASSESSMENT RELATIONS
// ============================================================================

export const assessmentsRelations = relations(assessments, ({ one, many }) => ({
  course: one(courses, {
    fields: [assessments.courseId],
    references: [courses.id],
  }),
  questions: many(questions),
  attempts: many(assessmentAttempts),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  assessment: one(assessments, {
    fields: [questions.assessmentId],
    references: [assessments.id],
  }),
  answers: many(answers),
}));

export const assessmentAttemptsRelations = relations(assessmentAttempts, ({ one, many }) => ({
  assessment: one(assessments, {
    fields: [assessmentAttempts.assessmentId],
    references: [assessments.id],
  }),
  user: one(users, {
    fields: [assessmentAttempts.userId],
    references: [users.id],
  }),
  answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  assessmentAttempt: one(assessmentAttempts, {
    fields: [answers.assessmentAttemptId],
    references: [assessmentAttempts.id],
  }),
}));

// ============================================================================
// COMMUNICATION RELATIONS
// ============================================================================

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export const forumPostsRelations = relations(forumPosts, ({ one, many }) => ({
  course: one(courses, {
    fields: [forumPosts.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [forumPosts.userId],
    references: [users.id],
  }),
  replies: many(forumReplies),
}));

export const forumRepliesRelations = relations(forumReplies, ({ one, many }) => ({
  post: one(forumPosts, {
    fields: [forumReplies.postId],
    references: [forumPosts.id],
  }),
  user: one(users, {
    fields: [forumReplies.userId],
    references: [users.id],
  }),
  parent: one(forumReplies, {
    fields: [forumReplies.parentId],
    references: [forumReplies.id],
    relationName: 'parentReply',
  }),
  replies: many(forumReplies, {
    relationName: 'parentReply',
  }),
}));

// ============================================================================
// PAYMENT RELATIONS
// ============================================================================

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [payments.courseId],
    references: [courses.id],
  }),
  subscription: one(subscriptions, {
    fields: [payments.subscriptionId],
    references: [subscriptions.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  plan: one(subscriptionPlans, {
    fields: [subscriptions.planId],
    references: [subscriptionPlans.id],
  }),
  payments: many(payments),
}));

export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));