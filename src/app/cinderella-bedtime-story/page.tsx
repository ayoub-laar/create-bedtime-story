"use client";

import { Fragment } from "react";
import Head from "next/head";
import Form from "../components/Generate/Form";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const StaticCinderellaStory = () => {
  const router = useRouter();

  const storyTitle = "Cinderella's Magical Night ✨";
  const fullContent = `
    Once upon a time, in a faraway kingdom, there lived a kind-hearted girl named Cinderella. She was loved by everyone for her sweet nature and gentle spirit. However, after her mother passed away, her father remarried a woman who had two daughters of her own. Unlike Cinderella, they were selfish and cruel. 😔

    Cinderella's stepmother and stepsisters treated her like a servant, making her do all the household chores. Despite the hardships, Cinderella remained kind and hopeful, dreaming of a better life. 🌟

    One day, the king announced a grand ball at the palace, inviting all the young ladies in the kingdom. 👑 Cinderella's stepsisters were thrilled and began preparing their finest dresses and accessories. Cinderella, too, longed to attend the ball, but her stepmother forbade her, giving her more chores to do instead. 😢

    On the night of the ball, as Cinderella sat weeping in the kitchen, her fairy godmother appeared. ✨ With a wave of her magic wand, she transformed Cinderella's rags into a beautiful gown and her worn shoes into delicate glass slippers. A pumpkin became a golden carriage, and mice turned into horses. The fairy godmother warned Cinderella that the magic would end at midnight. 🎃🐭

    Cinderella arrived at the ball and captivated everyone with her beauty, especially the prince. 👸🤴 They danced the night away, but as the clock struck twelve, Cinderella remembered the fairy godmother's warning. She fled the palace, leaving behind one of her glass slippers. ⏳👠

    The prince, determined to find the mysterious girl, searched the kingdom with the glass slipper. When he arrived at Cinderella's house, her stepsisters tried to fit into the slipper, but their feet were too large. Finally, Cinderella tried on the slipper, and it fit perfectly. The prince recognized her from the ball and asked her to marry him. 💍💑

    Cinderella and the prince lived happily ever after, proving that kindness and hope can overcome even the greatest of challenges. 💖👑

    But the story didn't end there. Cinderella, now a princess, used her new position to spread kindness throughout the kingdom. She opened schools 🏫, helped the poor 🥖, and made sure no child ever had to endure the hardships she faced. The entire kingdom flourished under her reign, and Cinderella became known not just for her beauty, but for her generosity and compassion. 🌺🌼

    Years passed, and Cinderella and the prince were blessed with children of their own. They taught their children the values of kindness and hope, ensuring that the legacy of Cinderella's magical night would live on for generations. And so, the kingdom remained a place of joy and prosperity, all thanks to the gentle heart of Cinderella. 👪🏰
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
            src="/images/characters/cinderella.webp"
            alt="Cinderella"
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

export default StaticCinderellaStory;
