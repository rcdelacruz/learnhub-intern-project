import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn Without Limits
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners on LearnHub - the most comprehensive e-learning platform
            designed to help you achieve your goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup">Start Learning</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Courses Available</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10K+</h3>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="text-muted-foreground">Completion Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">98%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LearnHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to succeed in your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Expert Instructors</CardTitle>
                <CardDescription>
                  Learn from industry professionals with years of experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Verified expertise</li>
                  <li>• Real-world experience</li>
                  <li>• Personalized feedback</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Learning</CardTitle>
                <CardDescription>
                  Engage with content through quizzes, assignments, and projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Hands-on projects</li>
                  <li>• Real-time assessments</li>
                  <li>• Progress tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flexible Schedule</CardTitle>
                <CardDescription>
                  Learn at your own pace with lifetime access to courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Self-paced learning</li>
                  <li>• Mobile accessibility</li>
                  <li>• Offline downloads</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground">
              Discover our most popular courses across different categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">Web Development</Badge>
                  <span className="text-lg font-bold">$49</span>
                </div>
                <CardTitle className="line-clamp-2">
                  Complete Next.js Developer Course
                </CardTitle>
                <CardDescription>
                  Master modern web development with Next.js, TypeScript, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>12 hours</span>
                  <span>⭐ 4.8 (1,234)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">Data Science</Badge>
                  <span className="text-lg font-bold">$79</span>
                </div>
                <CardTitle className="line-clamp-2">
                  Python for Data Analysis
                </CardTitle>
                <CardDescription>
                  Learn data analysis and visualization with Python and pandas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>18 hours</span>
                  <span>⭐ 4.9 (856)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">Design</Badge>
                  <span className="text-lg font-bold">$39</span>
                </div>
                <CardTitle className="line-clamp-2">
                  UI/UX Design Fundamentals
                </CardTitle>
                <CardDescription>
                  Create beautiful and user-friendly interfaces with design principles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>8 hours</span>
                  <span>⭐ 4.7 (692)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their careers with LearnHub.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}