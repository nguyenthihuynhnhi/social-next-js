"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./Client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollowAction = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId
      }
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id
        }
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId
        }
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id
          }
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId
          }
        });
      }
    }
  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
  }
};

export const switchBlockAction = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId
      }
    });

    if (existingBlock) {
      await prisma.follower.delete({
        where: {
          id: existingBlock.id
        }
      });
    } else {
      const blockCreate = await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId
        }
      });
    }

  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    throw Error("Some thing went wrong!");
  }
};

export const acceptFollowRequestAction = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId
      }
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id
        }
      });
    }

    await prisma.follower.create({
      data: {
        followerId: userId,
        followingId: currentUserId
      }
    });
  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    throw Error("Something went wrong");
  }
};


export const declineFollowRequestAction = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId
      }
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id
        }
      });
    }

  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    throw Error("Something went wrong");
  }
};

export const updateProfileAction = async (prevState: { success: boolean; error: boolean; },
  payload: { formData: FormData; cover: string; }) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };

  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLikeAction = async (postId: number) => {

  const { userId } = auth();

  if (!userId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        }
      });
    }
  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    throw new Error("Something went wrong");
  }
};

export const addCommentAction = async (postId: number, desc: string) => {
  const { userId } = auth();
  if (!userId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const createComment = await prisma.comment.create({
      data: {
        userId,
        postId,
        desc,
      },
      include: {
        user: true
      }
    });

    return createComment;
  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    throw Error("Something went wrong !!!");
  }
};

export const addPostAction = async (formData: FormData, img: string) => {

  try {
    const desc = formData.get("desc") as string;
    const Desc = z.string().min(1).max(255);

    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
      console.log("description is not valid");
      return;
    }

    const { userId } = auth();

    if (!userId) {
      throw Error("User is not authenticated !!!");

    }

    console.log({ userId });
    const createPost = await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
        // user: {
        //   connect: { id: userId }
        // }
      }
    });

    revalidatePath("/");
  } catch (error) {
    console.log("add post error:", (error as Error).message);
    throw Error((error as Error).message);
  }
};

export const addStoryAction = async (img: string) => {

  const { userId } = auth();

  if (!userId) {
    throw Error("User is not authenticated !!!");
  }

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
    throw Error("Something went wrong !!!");
  }
};

export const detelePostAction = async (postId: number) => {

  const { userId } = auth();

  if (!userId) {
    throw Error("User is not authenticated !!!");
  }
  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log("👙 🏊‍♀️  🏄‍♀️ 🌴 🌊  ~ error:", error);
  }
};