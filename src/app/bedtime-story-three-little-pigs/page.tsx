"use client";

import { Fragment } from "react";
import Head from "next/head";
import Form from "../components/Generate/Form";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const StaticThreeLittlePigsStory = () => {
  const router = useRouter();

  const storyTitle = "The Three Little Pigs' Adventure 🐷🏠";
  const fullContent = `
    Once upon a time, there were three little pigs who decided to leave their mother's home and build their own houses. 🐖🐖🐖

    The first little pig, being a bit lazy, decided to build his house out of straw. It was quick and easy, but not very strong. 🌾 The second little pig, who was somewhat lazy but slightly more industrious, built his house out of sticks. It was a bit sturdier than straw but still not very strong. 🌿 The third little pig, who was hardworking and wise, decided to build his house out of bricks. It took a lot of time and effort, but his house was very strong and sturdy. 🧱

    One day, a big bad wolf came to the first pig's straw house. He huffed and puffed and blew the house down in no time. The first little pig ran to his brother's stick house for safety. 🐺💨

    The wolf then came to the second pig's stick house. He huffed and puffed and blew that house down too. Both pigs ran to their brother's brick house for safety. 🏃‍♂️🏃‍♂️

    The wolf, determined to catch the pigs, came to the third pig's brick house. He huffed and puffed, but no matter how hard he tried, he couldn't blow the brick house down. The pigs were safe inside. 🏡😊

    Furious, the wolf decided to sneak into the house through the chimney. But the third little pig was clever and had a pot of boiling water waiting at the bottom of the chimney. When the wolf came down, he fell right into the pot and was so startled that he ran away, never to bother the three little pigs again. 🌡️🔥

    The three little pigs lived happily ever after in their sturdy brick house, knowing that hard work and perseverance pay off in the end. They enjoyed their days in peace, often reminiscing about their adventure and the lessons they learned. 🐷👷‍♂️

    As time went on, the three little pigs became well-known in their village. They shared their story with other animals, teaching them the value of hard work and planning. The village prospered as everyone began to build stronger homes and work together to ensure their safety and happiness. 🌻🏡

    The three little pigs often visited their mother, who was very proud of them. They built her a beautiful brick house next to theirs, and they all lived happily ever after, surrounded by friends and family. 🏡❤️

    And so, the story of the three little pigs and their adventure lived on, reminding everyone that with determination and effort, any challenge can be overcome. 🌟✨
  `;

  return (
    <Fragment>
      <Head>
        <title>{storyTitle}</title>
      </Head>
      <Form.Card>
        <div className="flex flex-col items-center">
          <Form.Header title={storyTitle} description="" />
          <img
            src="/images/characters/three little pigs.webp"
            alt="Three Little Pigs"
            className="my-4 w-3/4 md:w-1/2 lg:w-1/12 rounded"
          />
          <div className="text-lg leading-7 px-4 mt-8 space-y-4">
            {fullContent.split("\n\n").map((paragraph, index) => (
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

export default StaticThreeLittlePigsStory;
