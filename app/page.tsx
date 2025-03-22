import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary-foreground">ConnectEd</h1>
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/20 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Connecting Teachers, Volunteers, and Parents</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              A collaborative platform to enhance student learning through effective communication and volunteer
              support.
            </p>
            <Link href="/register">
              <Button size="lg" className="font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Role-Based Dashboards"
              description="Customized interfaces for teachers, volunteers, and parents with relevant tools and information."
            />
            <FeatureCard
              title="Class Management"
              description="Schedule classes, manage volunteers, and track student performance all in one place."
            />
            <FeatureCard
              title="Tamil-to-English Translation"
              description="Break language barriers with our built-in speech translation tool."
            />
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 ConnectEd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

