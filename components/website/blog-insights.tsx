import Image from "next/image";
import Link from "next/link";
import { listLatestBlogPosts } from "@/features/blog/queries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export async function BlogInsights() {
  const posts = await listLatestBlogPosts(3);

  return (
    <section className="bg-ivory-dim py-24 lg:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Insights"
          title="Property Insights"
          description="Notes on buying, selling, and building in Rawalpindi."
        />

        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-navy/15 bg-white/50 px-6 py-20 text-center">
            <span className="font-display text-xl text-navy">Articles coming soon</span>
            <p className="max-w-sm text-sm text-site-slate">
              We&apos;re preparing guides and updates on the local property market — check back soon.
            </p>
          </div>
        ) : (
          <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-navy/5">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs tracking-wide text-navy/30 uppercase">
                        Rayyan Insights
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium tracking-wide text-site-slate">
                      {formatDate(post.published_at)}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-navy text-balance group-hover:text-champagne">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-site-slate">{post.excerpt}</p>
                    )}
                    <span className="mt-1 text-xs font-semibold tracking-wide text-navy/70 group-hover:text-champagne">
                      Read Article →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
