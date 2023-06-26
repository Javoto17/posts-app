import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PostCard from "@/components/PostCard";

import "@testing-library/jest-dom";

describe("PostCard", () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    tags: ["react", "testing"],
    body: "This is a test post",
    reactions: 10,
    isFavorite: false,
    userId: 1234,
  };

  it("renders the post title", () => {
    const { getByText } = render(<PostCard post={mockPost} />);
    const titleElement = getByText(mockPost.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the post tags", () => {
    const { getByText } = render(<PostCard post={mockPost} />);
    const tagElements = mockPost.tags.map((tag) => getByText(`#${tag}`));
    expect(tagElements.length).toBe(mockPost.tags.length);
  });

  it("renders the post body", () => {
    const { getByText } = render(<PostCard post={mockPost} />);
    const bodyElement = getByText(mockPost.body);
    expect(bodyElement).toBeInTheDocument();
  });

  it("renders the post reactions count", () => {
    const { getByText } = render(<PostCard post={mockPost} />);
    const reactionsElement = getByText(mockPost.reactions.toString());
    expect(reactionsElement).toBeInTheDocument();
  });

  it("renders the favorite button", () => {
    const { getByRole } = render(<PostCard post={mockPost} />);
    const favoriteButton = getByRole("button");
    expect(favoriteButton).toBeInTheDocument();
  });

  it("toggles the favorite state on button click", () => {
    const toggleFavoriteMock = jest.fn();
    const { getByRole } = render(
      <PostCard post={mockPost} toggleFavorite={toggleFavoriteMock} />
    );

    const favoriteButton = getByRole("button");
    fireEvent.click(favoriteButton);

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
  });

  it('applies the "fill-red-500" class to the Heart icon when post is marked as favorite', () => {
    const { getByRole } = render(
      <PostCard post={{ ...mockPost, isFavorite: true }} />
    );
    const favoriteButton = getByRole("button");
    const heartIcon = favoriteButton.querySelector("svg");
    expect(heartIcon).toHaveClass("fill-red-500");
  });

  it('applies the "stroke-current" class to the Heart icon when post is not marked as favorite', () => {
    const { getByRole } = render(<PostCard post={mockPost} />);
    const favoriteButton = getByRole("button");
    const heartIcon = favoriteButton.querySelector("svg");
    expect(heartIcon).toHaveClass("stroke-current");
  });
});
