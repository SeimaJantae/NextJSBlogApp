const getBlog = async (id) => {
  try {
    const response = await fetch(`https://65cacb89efec34d9ed865094.mockapi.io/blogs/${id}`, { cache: "no-store" });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Page({ params }) {
  const blog = await getBlog(params.id);
  return (
    <div>
      <p>Blog id: {params.id}</p>
      <p>Blog title: {blog.title}</p>
      <p>Blog content: {blog.content}</p>
    </div>
  );
}
