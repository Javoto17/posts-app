import React from "react";
import { render } from "@testing-library/react";

import PostList from "@/components/PostList";

import "@testing-library/jest-dom";

describe("PostList", () => {
  // Tests that the component renders without crashing
  it("test_renders_without_crashing", () => {
    render(
      <PostList
        error={null}
        data={[]}
        renderItem={(post) => <div>{post?.title}</div>}
        isLoading={false}
        onReachedLimit={() => {}}
        isLimitReached={false}
      />
    );
  });

  // Tests that the component renders loading state when isLoading is true
  it("test_renders_loading_state", () => {
    const { getByText } = render(
      <PostList
        isLoading={true}
        error={null}
        data={[]}
        renderItem={(post) => <div>{post?.title}</div>}
        onReachedLimit={() => {}}
        isLimitReached={false}
      />
    );
    expect(getByText("Loading..")).toBeInTheDocument();
  });

  // Tests that the component renders error state when error is true
  it("test_renders_error_state", () => {
    const { getByText } = render(
      <PostList
        error={"error"}
        data={[]}
        renderItem={(post) => <div>{post?.title}</div>}
        isLoading={false}
        onReachedLimit={() => {}}
        isLimitReached={false}
      />
    );
    expect(getByText("Something went wrong..")).toBeInTheDocument();
  });

  // Tests that the component renders data when data is present and isLoading and error are false
  it("test_renders_data", () => {
    const data = [
      {
        id: 1,
        title: "title",
        body: "body",
        userId: 1,
        tags: [],
        reactions: 0,
        isFavorite: false,
      },
    ];
    const { getByText } = render(
      <PostList
        data={data}
        renderItem={(post) => <p>{post.title}</p>}
        isLoading={false}
        error={null}
        onReachedLimit={() => {}}
        isLimitReached={false}
      />
    );
    expect(getByText("title")).toBeInTheDocument();
  });
});
