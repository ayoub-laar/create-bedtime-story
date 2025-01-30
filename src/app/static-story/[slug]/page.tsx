import { staticStories } from "../../config/static-stories";
import { StaticStoryComponent } from "../../components/StaticStory/StaticStoryComponent";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

// Cette fonction génère les chemins statiques lors du build
export async function generateStaticParams() {
  return Object.values(staticStories).map((story) => ({
    slug: story.slug,
  }));
}

// Cette fonction génère les métadonnées pour chaque page
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