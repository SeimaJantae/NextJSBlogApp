"use client";

import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [blog, setBlog] = useState({ title: "", content: "" });
  const getBlog = async (id) => {
    try {
      const response = await fetch(`https://65cacb89efec34d9ed865094.mockapi.io/blogs/${id}`, { cache: "no-store" });
      const result = await response.json();
      setBlog(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(blog)
    try {
      const response = await fetch(`https://65cacb89efec34d9ed865094.mockapi.io/blogs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      // console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog(params.id);
  }, [params.id]);

  return (
    <div className="m-10 p-4 rounded-sm outline outline-1">
      <p className="text-xl">Edit blog</p>
      <p>Blog id: {params.id}</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
          <label>Blog title:</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            className="outline outline-1 p-2"
            onChange={(e) => {
              setBlog({ ...blog, title: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label>Blog content:</label>
          <textarea
            type="text"
            name="content"
            value={blog.content}
            className="outline outline-1 p-2 h-72"
            onChange={(e) => {
              setBlog({ ...blog, content: e.target.value });
            }}
          />
        </div>
        <div className="flex justify-center">
          <button className="outline outline-1 px-4 my-2">Update Blog</button>
        </div>
      </form>
    </div>
  );
}
