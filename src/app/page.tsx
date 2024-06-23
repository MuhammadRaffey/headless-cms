// src/app/page.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { getBlogs, BlogsData, Author, Asset } from "@/lib/fetchBlogs";
import ThemeToggle from "@/components/ThemeToggle";

const Page = async () => {
  const blogs = await getBlogs();

  const authors = blogs.includes.Entry || [];
  const assets = blogs.includes.Asset || [];

  const getAuthorData = (authorId: string): Author | null => {
    const author = authors.find((author) => author.sys.id === authorId);
    if (!author) {
      console.error(`Author not found for ID: ${authorId}`);
      return null;
    }
    return author;
  };

  const getAuthorImage = (imageId: string): Asset | null => {
    const image = assets.find((asset) => asset.sys.id === imageId);
    if (!image) {
      console.error(`Image not found for ID: ${imageId}`);
      return null;
    }
    return image;
  };

  return (
    <div className="p-4">
      <ThemeToggle />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
        {blogs.items.map((item) => {
          const author = getAuthorData(item.fields.createdBy.sys.id);
          if (!author) return null;

          const authorImage = getAuthorImage(author.fields.image.sys.id);
          if (!authorImage) return null;

          return (
            <Card key={item.sys.id} className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  {item.fields.title}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {item.fields.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex items-center gap-4 dark:text-gray-300">
                <Avatar>
                  <AvatarImage
                    src={`https:${authorImage.fields.file.url}`}
                    alt={author.fields.name}
                  />
                  <AvatarFallback>{author.fields.name[0]}</AvatarFallback>
                </Avatar>
                <p>
                  {dayjs(item.fields.createdAt).format("MMMM D, YYYY HH:mm ")}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
