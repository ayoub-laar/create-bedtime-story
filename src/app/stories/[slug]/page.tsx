import { staticStories } from "../../config/static-stories";
import { StaticStoryComponent } from "../../components/StaticStory/StaticStoryComponent";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.values(staticStories).map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const story = Object.values(staticStories).find(
    (story) => story.slug === params.slug
  );

  if (!story) {
    return {};
  }

  return story.metadata;
}

export default function Page({ params }: Props) {
  const story = Object.values(staticStories).find(
    (story) => story.slug === params.slug
  );

  if (!story) {
    notFound();
  }

  return <StaticStoryComponent story={story} />;
} 