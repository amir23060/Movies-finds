export const Like = async (movie, userId, setText) => {
  try {
    if (!userId) {
      setText(null);
      setTimeout(() => setText("Log in first"), 0);
      return;
    }
    const items = { title: movie.title || movie.name, id: movie.id, poster: movie.poster_path, media_type: movie.media_type };
    const res = await fetch(`http://localhost:8000/api/liked/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    const data = await res.json();
    setText(data.message);
  } catch (error) {
    console.log(error);
  }
};

export const Watch_list = async (movie, userId, setText) => {
  try {
    if (!userId) {
      setText(null);
      setTimeout(() => setText("Log in first"), 0);
      return;
    }
    const items = { title: movie.title || movie.name, id: movie.id, poster: movie.poster_path, media_type: movie.media_type };
    const res = await fetch(`http://localhost:8000/api/watchlist/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    const data = await res.json();
    setText(data.message);
  } catch (error) {
    console.log(error);
  }
};

export const LikedItems = async (userId, setLiked, setWatchlist) => {
  if (!userId) return;
  try {
    const res = await fetch(`http://localhost:8000/api/${userId}`);
    if (!res.ok) return;
    const data = await res.json();
    setLiked(data.liked ?? []);
    setWatchlist(data.watchList ?? []);
  } catch (error) {
    console.log(error);
  }
};

export const Next = (startIndex, setStartIndex, movies, visible) => {
  if (startIndex + visible < movies.length) setStartIndex(startIndex + 1);
};

export const Previous = (startIndex, setStartIndex) => {
  if (startIndex > 0) setStartIndex(startIndex - 1);
};

export const ShowDrop = (e) => {
  const drop = e.currentTarget.querySelector(".dropUp");
  if (drop) drop.style.display = "flex";
};

export const HideDrop = (e) => {
  const drop = e.currentTarget.querySelector(".dropUp");
  if (drop) drop.style.display = "none";
};