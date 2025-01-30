export interface StaticStory {
  slug: string;
  storyTitle: string;
  description: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      images: string;
      url: string;
    };
    twitter: {
      title: string;
      description: string;
      images: string;
      card: "summary_large_image";
    };
  };
}

export const staticStories: Record<string, StaticStory> = {
  cinderella: {
    slug: "cinderella-bedtime-story",
    storyTitle: "Cinderella's Magical Night ✨",
    description:
      "A delightful bedtime story about Cinderella and her magical adventure.",
    image: {
      src: "/images/characters/cinderella.webp",
      alt: "Cinderella",
    },
    content: `
    Once upon a time, in a faraway kingdom, there lived a kind-hearted girl named Cinderella. She was loved by everyone for her sweet nature and gentle spirit. However, after her mother passed away, her father remarried a woman who had two daughters of her own. Unlike Cinderella, they were selfish and cruel. 😔

    Cinderella's stepmother and stepsisters treated her like a servant, making her do all the household chores. Despite the hardships, Cinderella remained kind and hopeful, dreaming of a better life. 🌟

    One day, the king announced a grand ball at the palace, inviting all the young ladies in the kingdom. 👑 Cinderella's stepsisters were thrilled and began preparing their finest dresses and accessories. Cinderella, too, longed to attend the ball, but her stepmother forbade her, giving her more chores to do instead. 😢

    On the night of the ball, as Cinderella sat weeping in the kitchen, her fairy godmother appeared. ✨ With a wave of her magic wand, she transformed Cinderella's rags into a beautiful gown and her worn shoes into delicate glass slippers. A pumpkin became a golden carriage, and mice turned into horses. The fairy godmother warned Cinderella that the magic would end at midnight. 🎃🐭

    Cinderella arrived at the ball and captivated everyone with her beauty, especially the prince. 👸🤴 They danced the night away, but as the clock struck twelve, Cinderella remembered the fairy godmother's warning. She fled the palace, leaving behind one of her glass slippers. ⏳👠

    The prince, determined to find the mysterious girl, searched the kingdom with the glass slipper. When he arrived at Cinderella's house, her stepsisters tried to fit into the slipper, but their feet were too large. Finally, Cinderella tried on the slipper, and it fit perfectly. The prince recognized her from the ball and asked her to marry him. 💍💑

    Cinderella and the prince lived happily ever after, proving that kindness and hope can overcome even the greatest of challenges. 💖👑

    But the story didn't end there. Cinderella, now a princess, used her new position to spread kindness throughout the kingdom. She opened schools 🏫, helped the poor 🥖, and made sure no child ever had to endure the hardships she faced. The entire kingdom flourished under her reign, and Cinderella became known not just for her beauty, but for her generosity and compassion. 🌺🌼

    Years passed, and Cinderella and the prince were blessed with children of their own. They taught their children the values of kindness and hope, ensuring that the legacy of Cinderella's magical night would live on for generations. And so, the kingdom remained a place of joy and prosperity, all thanks to the gentle heart of Cinderella. 👪🏰
    `,
    metadata: {
      title: "Cinderella's Magical Night - Cinderella Bedtime Story",
      description:
        "Read the classic Cinderella bedtime story. Enjoy this enchanting tale with your kids and teach them the values of kindness and hope.",
      keywords:
        "Cinderella bedtime story, Cinderella, bedtime stories for kids, classic bedtime stories, children's stories",
      openGraph: {
        title: "Cinderella's Magical Night - Bedtime Story",
        description:
          "Read the classic Cinderella bedtime story. Enjoy this enchanting tale with your kids and teach them the values of kindness and hope.",
        images: "/images/characters/cinderella.webp",
        url: "https://www.CreateBedtimeStory.com/cinderella-bedtime-story",
      },
      twitter: {
        title: "Cinderella's Magical Night - Bedtime Story",
        description:
          "Read the classic Cinderella bedtime story. Enjoy this enchanting tale with your kids and teach them the values of kindness and hope.",
        images: "/images/characters/cinderella.webp",
        card: "summary_large_image",
      },
    },
  },
  "three-little-pigs": {
    slug: "bedtime-story-three-little-pigs",
    storyTitle: "The Three Little Pigs' Adventure 🐷🏠",
    description:
      "A delightful bedtime story about The Three Little Pigs and their adventure.",
    image: {
      src: "/images/characters/three%20little%20pigs.webp",
      alt: "The Three Little Pigs",
    },
    content: `
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
    `,
    metadata: {
      title:
        "The Three Little Pigs' Adventure - Three Little Pigs Bedtime Story",
      description:
        "Read the classic bedtime story of The Three Little Pigs' Adventure. Enjoy this enchanting tale with your kids and teach them the values of hard work and perseverance.",
      keywords:
        "three little pigs bedtime story, three little pigs, bedtime stories for kids, classic bedtime stories, children's stories",
      openGraph: {
        title: "The Three Little Pigs' Adventure - Bedtime Story",
        description:
          "Read the classic bedtime story of The Three Little Pigs' Adventure. Enjoy this enchanting tale with your kids and teach them the values of hard work and perseverance.",
        images: "/images/characters/three%20little%20pigs.webp",
        url: "https://www.CreateBedtimeStory.com/bedtime-story-three-little-pigs",
      },
      twitter: {
        title: "The Three Little Pigs' Adventure - Bedtime Story",
        description:
          "Read the classic bedtime story of The Three Little Pigs' Adventure. Enjoy this enchanting tale with your kids and teach them the values of hard work and perseverance.",
        images: "/images/characters/three%20little%20pigs.webp",
        card: "summary_large_image",
      },
    },
  },
};
