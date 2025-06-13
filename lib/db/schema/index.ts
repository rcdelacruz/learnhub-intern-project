import { pgTable, text, varchar, integer, boolean, timestamp, decimal, jsonb, pgEnum, serial, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// ENUMS
// ============================================================================

export const userRoleEnum = pgEnum('user_role', ['STUDENT', 'INSTRUCTOR', 'ADMIN']);
export const studentLevelEnum = pgEnum('student_level', ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']);
export const payoutStatusEnum = pgEnum('payout_status', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']);
export const courseLevelEnum = pgEnum('course_level', ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS']);
export const courseStatusEnum = pgEnum('course_status', ['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const lessonTypeEnum = pgEnum('lesson_type', ['TEXT', 'VIDEO', 'QUIZ', 'ASSIGNMENT', 'DOWNLOAD']);
export const enrollmentStatusEnum = pgEnum('enrollment_status', ['ACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED']);
export const assessmentTypeEnum = pgEnum('assessment_type', ['QUIZ', 'EXAM', 'ASSIGNMENT', 'PROJECT']);
export const questionTypeEnum = pgEnum('question_type', ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY', 'CODE', 'FILL_BLANK']);
export const assessmentStatusEnum = pgEnum('assessment_status', ['IN_PROGRESS', 'SUBMITTED', 'GRADED', 'CANCELLED']);
export const messageTypeEnum = pgEnum('message_type', ['DIRECT', 'ANNOUNCEMENT', 'SYSTEM']);
export const notificationTypeEnum = pgEnum('notification_type', ['INFO', 'SUCCESS', 'WARNING', 'ERROR', 'COURSE_UPDATE', 'ASSIGNMENT_DUE', 'NEW_MESSAGE', 'PAYMENT_SUCCESS']);
export const paymentStatusEnum = pgEnum('payment_status', ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE']);
export const couponTypeEnum = pgEnum('coupon_type', ['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING']);
export const analyticsTypeEnum = pgEnum('analytics_type', ['PAGE_VIEW', 'COURSE_VIEW', 'ENROLLMENT', 'COMPLETION', 'REVENUE', 'USER_ACTIVITY', 'ASSESSMENT_SCORE']);
export const reportTypeEnum = pgEnum('report_type', ['COURSE_PERFORMANCE', 'STUDENT_PROGRESS', 'REVENUE_ANALYSIS', 'INSTRUCTOR_EARNINGS', 'PLATFORM_USAGE', 'CUSTOM']);

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================================================

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  role: userRoleEnum('role').default('STUDENT').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// ============================================================================
// STUDENT MANAGEMENT MODULE
// ============================================================================

export const students = pgTable('students', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio'),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }),
  phone: text('phone'),
  address: text('address'),
  interests: text('interests').array(),
  goals: text('goals'),
  level: studentLevelEnum('level').default('BEGINNER').notNull(),
  points: integer('points').default(0).notNull(),
  streak: integer('streak').default(0).notNull(),
  lastActive: timestamp('last_active', { mode: 'date' }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const achievements = pgTable('achievements', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  badgeUrl: text('badge_url'),
  earnedAt: timestamp('earned_at', { mode: 'date' }).defaultNow().notNull(),
});

export const certificates = pgTable('certificates', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  certificateUrl: text('certificate_url').notNull(),
  issuedAt: timestamp('issued_at', { mode: 'date' }).defaultNow().notNull(),
});

// ============================================================================
// INSTRUCTOR MANAGEMENT MODULE
// ============================================================================

export const instructors = pgTable('instructors', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio'),
  expertise: text('expertise').array(),
  experience: text('experience'),
  education: text('education'),
  website: text('website'),
  linkedIn: text('linkedin'),
  twitter: text('twitter'),
  isVerified: boolean('is_verified').default(false).notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0').notNull(),
  totalStudents: integer('total_students').default(0).notNull(),
  totalEarnings: decimal('total_earnings', { precision: 10, scale: 2 }).default('0').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const instructorReviews = pgTable('instructor_reviews', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  instructorId: text('instructor_id').notNull().references(() => instructors.id, { onDelete: 'cascade' }),
  studentId: text('student_id').notNull(),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const payouts = pgTable('payouts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  instructorId: text('instructor_id').notNull().references(() => instructors.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  status: payoutStatusEnum('status').default('PENDING').notNull(),
  method: text('method'),
  processedAt: timestamp('processed_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ============================================================================
// COURSE MANAGEMENT MODULE
// ============================================================================

export const courses = pgTable('courses', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  thumbnail: text('thumbnail'),
  trailer: text('trailer'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0').notNull(),
  discountPrice: decimal('discount_price', { precision: 10, scale: 2 }),
  currency: text('currency').default('USD').notNull(),
  level: courseLevelEnum('level').default('BEGINNER').notNull(),
  duration: integer('duration'), // in minutes
  language: text('language').default('English').notNull(),
  category: text('category').notNull(),
  tags: text('tags').array(),
  status: courseStatusEnum('status').default('DRAFT').notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0').notNull(),
  totalStudents: integer('total_students').default(0).notNull(),
  totalReviews: integer('total_reviews').default(0).notNull(),
  instructorId: text('instructor_id').notNull().references(() => instructors.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const courseModules = pgTable('course_modules', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  duration: integer('duration'), // in minutes
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const lessons = pgTable('lessons', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  moduleId: text('module_id').notNull().references(() => courseModules.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  type: lessonTypeEnum('type').default('TEXT').notNull(),
  videoUrl: text('video_url'),
  duration: integer('duration'), // in minutes
  order: integer('order').notNull(),
  isFree: boolean('is_free').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const enrollments = pgTable('enrollments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  enrolledAt: timestamp('enrolled_at', { mode: 'date' }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  progress: decimal('progress', { precision: 5, scale: 2 }).default('0').notNull(), // percentage
  status: enrollmentStatusEnum('status').default('ACTIVE').notNull(),
  accessExpiresAt: timestamp('access_expires_at', { mode: 'date' }),
});

export const courseProgress = pgTable('course_progress', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  completedLessons: integer('completed_lessons').default(0).notNull(),
  totalLessons: integer('total_lessons').default(0).notNull(),
  progress: decimal('progress', { precision: 5, scale: 2 }).default('0').notNull(), // percentage
  lastAccessed: timestamp('last_accessed', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const lessonProgress = pgTable('lesson_progress', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  courseProgressId: text('course_progress_id').notNull().references(() => courseProgress.id, { onDelete: 'cascade' }),
  lessonId: text('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  isCompleted: boolean('is_completed').default(false).notNull(),
  timeSpent: integer('time_spent').default(0).notNull(), // in seconds
  lastAccessed: timestamp('last_accessed', { mode: 'date' }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { mode: 'date' }),
});

export const courseReviews = pgTable('course_reviews', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  isPublic: boolean('is_public').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Export all tables and enums
export * from './relations';