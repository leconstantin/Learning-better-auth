import { prisma } from "@/lib/prisma";
import React from "react";

export default async function Page() {
  const blogs = await prisma.blogPost.findMany();
  return (
    <div className="p-10 container">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <br />
      {blogs.length} Blog Posts
    </div>
  );
}
