import { db } from '../lib/db';
import { users, students, instructors, courses } from '../lib/db/schema';
import { createId } from '@paralleldrive/cuid2';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Create sample users
    const sampleUsers = [
      {
        id: createId(),
        name: 'John Doe',
        email: 'john@example.com',
        role: 'STUDENT' as const,
      },
      {
        id: createId(),
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'INSTRUCTOR' as const,
      },
      {
        id: createId(),
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'ADMIN' as const,
      },
    ];

    console.log('👥 Creating users...');
    const insertedUsers = await db.insert(users).values(sampleUsers).returning();
    console.log(`✅ Created ${insertedUsers.length} users`);

    // Create student profile for John
    const johnId = insertedUsers.find(u => u.email === 'john@example.com')?.id;
    if (johnId) {
      await db.insert(students).values({
        id: createId(),
        userId: johnId,
        bio: 'Passionate learner eager to grow my skills',
        level: 'BEGINNER',
        points: 0,
        streak: 0,
      });
      console.log('👨‍🎓 Created student profile');
    }

    // Create instructor profile for Jane
    const janeId = insertedUsers.find(u => u.email === 'jane@example.com')?.id;
    if (janeId) {
      const instructorId = createId();
      await db.insert(instructors).values({
        id: instructorId,
        userId: janeId,
        bio: 'Experienced developer and educator',
        expertise: ['JavaScript', 'React', 'Node.js'],
        isVerified: true,
        rating: '4.8',
      });
      console.log('👩‍🏫 Created instructor profile');

      // Create sample course
      await db.insert(courses).values({
        id: createId(),
        title: 'Introduction to Web Development',
        slug: 'intro-web-development',
        description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript',
        price: '99.99',
        level: 'BEGINNER',
        category: 'Web Development',
        tags: ['HTML', 'CSS', 'JavaScript'],
        status: 'PUBLISHED',
        isPublished: true,
        instructorId,
      });
      console.log('📚 Created sample course');
    }

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('✨ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });