import {  useState ,useEffect
} from "react";
import { deletePost, getPosts, editPost } from "../services/posts.service";
import PostCard from "../components/PostCard";
import Loader from "../components/common/loader/loaderGif";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { FixedSizeList as List } from "react-window";
import { motion as Motion, AnimatePresence  } from "framer-motion";
function Posts() {

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { y:20,x:10, opacity: 0, scale: 0.8, height: 0, marginBottom: 0, padding: 0, transition: { duration: 0.8 } }
  };
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) return JSON.parse(cached); 

  const res = await getPosts(); 
  localStorage.setItem(CACHE_KEY, JSON.stringify(res));
  return res;
},
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 60, 
    refetchOnWindowFocus: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const queryClient = useQueryClient();
  let [currentPage, setCurrentPage] = useState(1);
  // const hasFetched = useRef(false);
  const groupedPosts = posts.reduce((acc, post) => {
    acc[post.userId] = acc[post.userId] || [];
    acc[post.userId].push(post);
    return acc;
  }, {});
  const userIds = Object.keys(groupedPosts);
  const postsPerPage = 2;
  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  const currentUsersID = userIds.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userIds.length / postsPerPage);
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const CACHE_KEY = "cachedPosts";
   const [offlineQueue, setOfflineQueue] = useState(
     JSON.parse(localStorage.getItem("offlineQueue") || "[]")
  );
  const { t } = useTranslation("product");
  
  
  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setIsModalOpen(true);
  };

const deleteMutation = useMutation({
  mutationFn: deletePost,
        networkMode: "online",
  onMutate: async (postId) => {
    await queryClient.cancelQueries(["posts"]);
    const previousPosts = queryClient.getQueryData(["posts"]);

    queryClient.setQueryData(["posts"], (old) =>
      old.filter((p) => p.id !== postId)
    );
    if (!navigator.onLine) {
      console.log(navigator.onLine);
      
        const newQueue = [...offlineQueue, { type: "delete", id: postId }];
        localStorage.setItem("offlineQueue", JSON.stringify(newQueue));
        setOfflineQueue(newQueue);
      }
    return { previousPosts };
  },

  onError: (err, postId, context) => {
    queryClient.setQueryData(["posts"], context.previousPosts);
  },
  retry: 3,
  
});
  // onSettled: () => {
  //   queryClient.invalidateQueries(["posts"]);
  // },
// });
const confirmDelete = () => {
  deleteMutation.mutate(postToDelete);
  setIsModalOpen(false);
  
};
  const editMutation = useMutation({
  mutationFn: ({ id, data }) => editPost(id, data),
  onMutate: async ({ id, data }) => {
    await queryClient.cancelQueries(["posts"]);
    const previousPosts = queryClient.getQueryData(["posts"]);
    // Optimistic update
    queryClient.setQueryData(["posts"], (old) =>
      old.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
      if (!navigator.onLine) {
        const newQueue = [...offlineQueue, { type: "edit", id, data }];
        localStorage.setItem("offlineQueue", JSON.stringify(newQueue));
        setOfflineQueue(newQueue);
      }

    return { previousPosts };
  },
  onError: (err, variables, context) => {
    queryClient.setQueryData(["posts"], context.previousPosts);
  },
  retry: 3,
});
const confirmEdit = (id, newData) => {
  editMutation.mutate({ id, data: newData });
};
useEffect(() => {
   console.log("Effect loaded"); 
  const handleOnline = () => console.log("Online!");
  const handleOffline = () => console.log("Offline!");

 window.addEventListener("online", () => {
  const offlineDeletes = JSON.parse(localStorage.getItem("deleteQueue") || "[]");
  offlineDeletes.forEach(async id => {
    await deletePost(id); 
  });
  localStorage.removeItem("deleteQueue");
});
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
const allPosts = posts;

const Row = ({ index, style }) => {
  const post = allPosts[index];

  return (
    <div style={style}>
      <PostCardWithSeeMore
        title={post.title}
        body={post.body}
        onDelete={() => handleDeleteClick(post.id)}
        onEdit={(newData) => confirmEdit(post.id, newData)}
      />
    </div>
  );
};
  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 dark:text-red-400">Error loading posts</p>;
  return (

       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-2 md:py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">{t("posts")}</h2>
    <AnimatePresence mode="wait">
        {currentUsersID.map((userId) => (
          <Motion.div
            key={`${userId}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"  
            // style={{ overflow: "hidden" }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t("user")} {userId}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedPosts[userId].map((post) => (
                <Motion.div key={post.id} variants={cardVariants}>
                  <PostCardWithSeeMore
                    title={post.title}
                    body={post.body}
                    onDelete={() => {
                     handleDeleteClick(post.id)
                    }}
                    onEdit={(newData) => confirmEdit(post.id, newData)}
                  />
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        ))}
      </AnimatePresence>


      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-12">
        {/* Previous */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="
      px-4 py-2 rounded-full text-sm font-medium transition
      bg-white dark:bg-gray-700
      border border-gray-300 dark:border-gray-600
      text-gray-700 dark:text-gray-300
      hover:bg-purple-50 dark:hover:bg-gray-600
      disabled:opacity-50 disabled:cursor-not-allowed
    "
        >
          {t("previous")}
        </button>

        {/* Current Page Number */}
        <span
          className="
    px-4 py-2 rounded-full text-sm font-semibold
    bg-purple-600 text-white shadow-lg
  "
        >
          {currentPage}
        </span>

        {/* Next */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="
      px-4 py-2 rounded-full text-sm font-medium transition
      bg-white dark:bg-gray-700
      border border-gray-300 dark:border-gray-600
      text-gray-700 dark:text-gray-300
      hover:bg-purple-50 dark:hover:bg-gray-600
      disabled:opacity-50 disabled:cursor-not-allowed
    "
        >
          {t("next")}
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Are you sure you want to delete?
            </h3>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component to handle "See More"
function PostCardWithSeeMore({ title, body, onDelete, onEdit }) {
const [expanded, setExpanded] = useState(false);
 const toggleExpand = () => setExpanded((prev) => !prev); 
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  // const [newBody, setNewBody] = useState(body);

  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
      
      {editing ? (
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 mb-2 w-full text-black dark:text-white"
        />
      ) : (
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
      )}

     <p className="text-gray-600 dark:text-gray-300 mb-3">
  {body ? (expanded ? body : body.length > 100 ? body.slice(0, 100) + "..." : body) : ""}
</p>

{body && body.length > 100 && (
  <button onClick={toggleExpand} className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-semibold">
    {expanded ? t("seeless") : t("seemore")}
  </button>
)}
      <div className="flex justify-between items-center">
        <button onClick={onDelete} className="text-red-500">
          Delete
        </button>

        {editing ? (
          <button
            onClick={() => {
              onEdit({ title: newTitle });
              setEditing(false);
            }}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default Posts;
 function EmptyState() {
  return (
    <div className="empty-container">
      <img src="/empty.svg" alt="No posts illustration" />

      <h2>No posts yet</h2>
    </div>
  );
}