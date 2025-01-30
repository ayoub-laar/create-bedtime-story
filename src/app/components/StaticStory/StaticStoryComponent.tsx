"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Form from "../Generate/Form";
import { StaticStory } from "@/app/config/static-stories";

interface StaticStoryProps {
  story: StaticStory;
}

export const StaticStoryComponent = ({ story }: StaticStoryProps) => {
  const router = useRouter();

  return (
    <Fragment>
      <Form.Card>
        <div className="flex flex-col items-center">
          <Form.Header
            title={story.storyTitle}
            description={story.description}
          />
          <img
            src={story.image.src}
            alt={story.image.alt}
            className="my-4 w-3/4 md:w-1/2 lg:w-1/3 rounded"
          />
          <div className="text-lg leading-7 px-4 mt-8 space-y-4">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Button
            size="lg"
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-8 px-8 py-3 font-bold text-xl animate-pulse hover:bg-pink-700 transition-all duration-300"
            onClick={() => router.push("/")}
          >
            Generate a New Story
          </Button>
        </div>
      </Form.Card>
    </Fragment>
  );
}; 