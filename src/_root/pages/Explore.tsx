import { Input } from "@/components/ui/input";
import { useState } from "react";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queryAndMutation";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";

const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debounceedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPost(searchValue);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.document.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full text-white">Search Feed</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-zinc-950">
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

        <div className="flex-center gap-3 bg-zinc-950 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-zinc-200">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults />
        ) : shouldShowPosts ? (
          <p className="text-zinc-400 mt-10 text-center w-full">End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
