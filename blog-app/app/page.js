import Link from "next/link";

const getBlogs = async () => {
  try {
    const response = await fetch("https://65cacb89efec34d9ed865094.mockapi.io/blogs", { cache: "no-store" });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="p-10 h-screen flex flex-col items-center">
      <div className="p-4 rounded-sm outline outline-1">
        <p className="text-xl">All blogs</p>
        {blogs.map((blog, index) => (
          <div className="mb-2 flex flex-row" key={index}>
            <p>
              Blog {blog.id}: {blog.title}
            </p>
            <Link href={`/blog/${blog.id}`}>
              <button className="outline outline-1 px-4 ml-2">Read blog</button>
            </Link>
          </div>
        ))}
        <div className="flex justify-center my-2">
          <Link href={"/login"}>
            <button className="outline outline-1 px-4">Login to edit blog</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
