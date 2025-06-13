import { pgTable, text, integer, boolean, timestamp, decimal, jsonb } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { 
  assessmentTypeEnum, 
  questionTypeEnum, 
  assessmentStatusEnum,
  messageTypeEnum,
  notificationTypeEnum,
  paymentStatusEnum,
  subscriptionStatusEnum,
  couponTypeEnum,
  analyticsTypeEnum,
  reportTypeEnum
} from './index';
import { courses, users, students, instructors } from './index';

// ============================================================================
// ASSESSMENT SYSTEM MODULE
// ============================================================================

export const assessments = pgTable('assessments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  type: assessmentTypeEnum('type').default('QUIZ').notNull(),
  timeLimit: integer('time_limit'), // in minutes
  attempts: integer('attempts').default(1).notNull(),
  passingScore: integer('passing_score').default(70).notNull(),
  isRequired: boolean('is_required').default(false).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const questions = pgTable('questions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  assessmentId: text('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  type: questionTypeEnum('type').default('MULTIPLE_CHOICE').notNull(),
  options: jsonb('options'), // For multiple choice questions
  correctAnswer: text('correct_answer').notNull(),
  explanation: text('explanation'),
  points: integer('points').default(1).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const assessmentAttempts = pgTable('assessment_attempts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  assessmentId: text('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  startedAt: timestamp('started_at', { mode: 'date' }).defaultNow().notNull(),
  submittedAt: timestamp('submitted_at', { mode: 'date' }),
  score: decimal('score', { precision: 5, scale: 2 }), // percentage
  maxScore: integer('max_score').notNull(),
  status: assessmentStatusEnum('status').default('IN_PROGRESS').notNull(),
  timeSpent: integer('time_spent').default(0).notNull(), // in seconds
  attempt: integer('attempt').default(1).notNull(),
});

export const answers = pgTable('answers', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  questionId: text('question_id').notNull().references(() => questions.id, { onDelete: 'cascade' }),
  assessmentAttemptId: text('assessment_attempt_id').notNull().references(() => assessmentAttempts.id, { onDelete: 'cascade' }),
  answer: text('answer').notNull(),
  isCorrect: boolean('is_correct'),
  points: decimal('points', { precision: 5, scale: 2 }).default('0').notNull(),
  feedback: text('feedback'),
  submittedAt: timestamp('submitted_at', { mode: 'date' }).defaultNow().notNull(),
});

// ============================================================================
// COMMUNICATION SYSTEM MODULE
// ============================================================================

export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: text('receiver_id').notNull(),
  subject: text('subject'),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  type: messageTypeEnum('type').default('DIRECT').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const forumPosts = pgTable('forum_posts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  isPinned: boolean('is_pinned').default(false).notNull(),
  isLocked: boolean('is_locked').default(false).notNull(),
  views: integer('views').default(0).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const forumReplies = pgTable('forum_replies', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  postId: text('post_id').notNull().references(() => forumPosts.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: text('parent_id').references(() => forumReplies.id), // For nested replies
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: notificationTypeEnum('type').default('INFO').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ============================================================================
// PAYMENT & ENROLLMENT MODULE
// ============================================================================

export const payments = pgTable('payments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: text('course_id').references(() => courses.id),
  subscriptionId: text('subscription_id').references(() => subscriptions.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  status: paymentStatusEnum('status').default('PENDING').notNull(),
  paymentMethod: text('payment_method'),
  stripePaymentId: text('stripe_payment_id').unique(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull(),
  planId: text('plan_id').notNull().references(() => subscriptionPlans.id),
  status: subscriptionStatusEnum('status').default('ACTIVE').notNull(),
  currentPeriodStart: timestamp('current_period_start', { mode: 'date' }).notNull(),
  currentPeriodEnd: timestamp('current_period_end', { mode: 'date' }).notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const subscriptionPlans = pgTable('subscription_plans', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  interval: text('interval').notNull(), // monthly, yearly
  features: text('features').array(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const coupons = pgTable('coupons', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  code: text('code').notNull().unique(),
  type: couponTypeEnum('type').default('PERCENTAGE').notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(), // percentage or fixed amount
  maxUses: integer('max_uses'), // null = unlimited
  currentUses: integer('current_uses').default(0).notNull(),
  validFrom: timestamp('valid_from', { mode: 'date' }).defaultNow().notNull(),
  validUntil: timestamp('valid_until', { mode: 'date' }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ============================================================================
// ANALYTICS & REPORTING MODULE
// ============================================================================

export const analytics = pgTable('analytics', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  type: analyticsTypeEnum('type').notNull(),
  entityId: text('entity_id').notNull(), // course_id, user_id, etc.
  entityType: text('entity_type').notNull(), // course, user, payment, etc.
  event: text('event').notNull(), // view, enrollment, completion, etc.
  value: decimal('value', { precision: 10, scale: 2 }), // revenue, time_spent, etc.
  metadata: jsonb('metadata'),
  timestamp: timestamp('timestamp', { mode: 'date' }).defaultNow().notNull(),
  date: timestamp('date', { mode: 'date' }).defaultNow().notNull(),
});

export const reports = pgTable('reports', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description'),
  type: reportTypeEnum('type').notNull(),
  parameters: jsonb('parameters').notNull(), // filters, date ranges, etc.
  data: jsonb('data').notNull(), // generated report data
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const systemHealth = pgTable('system_health', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  service: text('service').notNull(), // database, redis, stripe, etc.
  status: text('status').notNull(), // healthy, degraded, down
  responseTime: decimal('response_time', { precision: 10, scale: 3 }), // in milliseconds
  errorRate: decimal('error_rate', { precision: 5, scale: 2 }), // percentage
  metadata: jsonb('metadata'),
  checkedAt: timestamp('checked_at', { mode: 'date' }).defaultNow().notNull(),
});