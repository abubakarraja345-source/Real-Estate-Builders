import Image from "next/image";
import { listFeaturedConstructionProjects } from "@/features/construction/queries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const STATUS_LABEL: Record<string, string> = {
  planned: "Planned",
  ongoing: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

export async function FeaturedProjects() {
  const projects = await listFeaturedConstructionProjects(2);

  if (projects.length === 0) return null;

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Construction Projects"
          title="Featured Work"
          description="A look at construction projects Rayyan Builders is delivering across Rawalpindi."
        />

        <Reveal className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <RevealItem key={project.id}>
              <div
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-navy/5">
                  {project.coverImageUrl ? (
                    <Image
                      src={project.coverImageUrl}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs tracking-wide text-navy/30 uppercase">
                      Photo coming soon
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start gap-4">
                  <span className="rounded-sm bg-navy/5 px-3 py-1 text-xs font-semibold tracking-wide text-navy uppercase">
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-navy text-balance">
                    {project.title}
                  </h3>
                  {project.location && <p className="text-sm text-site-slate">{project.location}, {project.city}</p>}
                  {project.description && (
                    <p className="max-w-md text-sm leading-relaxed text-site-slate">
                      {project.description}
                    </p>
                  )}
                  <Button href={`/construction/projects/${project.slug}`} variant="text" className="mt-2">
                    View Project →
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
