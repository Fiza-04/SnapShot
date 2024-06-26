import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import { useGetUsers, useSearchPost } from "@/lib/react-query/queryAndMutation";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetUsers();

  console.log("Explore useGetUsers =>", useGetUsers());

  console.log("Explore posts =>", posts);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPost(debouncedValue);

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  console.log("Explore pages =>", posts.pages);

  useEffect(() => {
    if (inView && shouldShowSearchResults) fetchNextPage();
  }, [inView, shouldShowSearchResults, hasNextPage]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full text-white">Search Feed</h2>
        <div className="flex gap-1 px-4 w-full bg-zinc-900 rounded-[20px] border border-zinc-800">
          <img
            src="/assets/icons/search.svg"
            width={23}
            height={23}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 cursor-pointer ">
          <p className="small-medium md:base-medium text-zinc-200">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-zinc-400 mt-10 text-center w-full">End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-5">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
