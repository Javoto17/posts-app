// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import PostList from './PostList';

// import '@testing-library/jest-dom';

// describe('PostList', () => {
//   const mockData = [
//     { id: 1, title: 'Post 1' },
//     { id: 2, title: 'Post 2' },
//     { id: 3, title: 'Post 3' },
//   ];

//   it('renders loading state', () => {
//     render(<PostList isLoading={true} />);
//     const loadingElement = screen.getByText('Loading..');
//     expect(loadingElement).toBeInTheDocument();
//   });

//   it('renders data correctly', () => {
//     render(
//       <PostList data={mockData} renderItem={(post) => <h1>{post.title}</h1>} />
//     );
//     const postElements = screen.getAllByRole('heading', { level: 1 });
//     expect(postElements.length).toBe(mockData.length);
//     expect(postElements[0]).toHaveTextContent(mockData[0].title);
//     expect(postElements[1]).toHaveTextContent(mockData[1].title);
//     expect(postElements[2]).toHaveTextContent(mockData[2].title);
//   });

//   it('renders error state', () => {
//     render(<PostList error={true} isLoading={false} />);
//     const errorElement = screen.getByText('Ups');
//     expect(errorElement).toBeInTheDocument();
//   });

//   it('calls onReachedLimit function when reached the limit', () => {
//     const mockOnReachedLimit = jest.fn();
//     render(<PostList data={mockData} onReachedLimit={mockOnReachedLimit} />);
//     const lastPostElement = screen.getByText(
//       mockData[mockData.length - 1].title
//     );
//     expect(mockOnReachedLimit).not.toHaveBeenCalled();
//     // Simulate reaching the limit by scrolling to the last post element
//     lastPostElement.scrollIntoView();
//     expect(mockOnReachedLimit).toHaveBeenCalled();
//   });
// });
