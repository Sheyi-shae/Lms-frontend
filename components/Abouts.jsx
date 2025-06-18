import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Target, Heart, Lightbulb, Shield, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutUsComponent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">About Lucis</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Illuminating the Path to
                <span className="text-emerald-600"> Knowledge</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Lucis is more than just a learning management system. We're a community dedicated to making quality
                education accessible, engaging, and transformative for learners worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Start Learning Today
                </Button>
                <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  Explore Courses
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Students learning together"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50,000+</p>
                    <p className="text-sm text-gray-600">Active Learners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that education should be a light that guides everyone toward their full potential
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To democratize access to high-quality education by providing an intuitive, powerful learning
                  management system that empowers educators to create engaging experiences and helps learners achieve
                  their goals, regardless of their background or location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Lightbulb className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading platform that transforms how the world learns, creating a future where quality
                  education is accessible to everyone, fostering innovation, critical thinking, and lifelong learning in
                  communities across the globe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">What Makes Lucis Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built our platform with both educators and learners in mind, creating tools that make teaching and
              learning more effective and enjoyable
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Learning</h3>
                <p className="text-gray-600">
                  Engage with multimedia content, interactive quizzes, and collaborative projects that make learning
                  dynamic and memorable.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
                <p className="text-gray-600">
                  Connect with peers, join study groups, and participate in discussions that enhance your learning
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Certified Learning</h3>
                <p className="text-gray-600">
                  Earn recognized certificates and badges that validate your skills and knowledge in your chosen field.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Adaptive Technology</h3>
                <p className="text-gray-600">
                  Our AI-powered platform adapts to your learning style and pace, providing personalized recommendations
                  and support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Your data and progress are protected with enterprise-grade security, ensuring a safe learning
                  environment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4">
                  <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated support team is always here to help you succeed, providing assistance whenever you need
                  it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate educators, technologists, and innovators working together to transform education
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Sarah Johnson"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
                <p className="text-emerald-600 font-medium mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Former educator with 15+ years of experience in curriculum development and educational technology.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Michael Chen"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-emerald-600 font-medium mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Tech visionary specializing in scalable learning platforms and AI-driven educational solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Emily Rodriguez"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
                <p className="text-emerald-600 font-medium mb-3">Head of Design</p>
                <p className="text-gray-600 text-sm">
                  UX expert focused on creating intuitive, accessible learning experiences for all users.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="David Kim"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">David Kim</h3>
                <p className="text-emerald-600 font-medium mb-3">Head of Content</p>
                <p className="text-gray-600 text-sm">
                  Educational content strategist with expertise in curriculum design and learning outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">These principles guide everything we do at Lucis</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility First</h3>
              <p className="text-gray-600">
                Education should be available to everyone, regardless of their circumstances or background.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our platform using the latest technology to enhance learning experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Learning is better together. We foster connections between learners, educators, and experts.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest quality in everything we create, from content to user experience.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Empathy</h3>
              <p className="text-gray-600">
                We understand the challenges learners face and design solutions with compassion and care.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and respect for our users' privacy and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-emerald-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Join thousands of learners who are already transforming their lives through education on Lucis. Your future
            starts with a single step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
