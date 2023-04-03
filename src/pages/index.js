import IndexLayout from "@/components/IndexLayout";
import PostCard from "@/components/PostCard";
import { useState } from "react";

export default function HomeIndex() {
  const [post, setPost] = useState([
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
    {
      id: 1,
      title: "One Piece episode 967",
      slug: "one-piece-episode-967",
      descriptions: "One piece descriptions",
      images:
        "https://akcdn.detik.net.id/visual/2020/01/30/fd8a89f8-cd07-4d7e-9a24-17c440c90e4d_169.png?w=650&q=90",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Advanture" },
        { id: 3, name: "Comedy" },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <IndexLayout>
        {!loading ? (
          <div className="flex flex-wrap gap-4">
            {post ? post.map((p) => <PostCard key={p.id} data={p} />) : ""}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-11 h-11 flex items-center justify-center animate-spin">
              <i className="fa-light fa-spinner"></i>
            </div>
          </div>
        )}
      </IndexLayout>
    </div>
  );
}
