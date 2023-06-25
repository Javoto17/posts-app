import { Post } from '@/models/post';
import React, { createContext, ReactNode, useReducer, useRef } from 'react';

import Modal, { ModalProps } from '@/components/Modal';

enum AppActions {
  ADD_POSTS = 'ADD_POSTS',
  TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

// Reducer para manejar las acciones
const reducer = (state, action) => {
  switch (action.type) {
    case AppActions.ADD_POSTS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.payload.map((post: Post) => {
            return {
              ...post,
              isFavorite: false,
            };
          }),
        ],
      };
    case AppActions.OPEN_MODAL:
      return {
        ...state,
        modalState: {
          open: true,
          post: action.payload.post,
        },
      };
    case AppActions.CLOSE_MODAL:
      return {
        ...state,
        modalState: {
          open: false,
          post: null,
        },
      };
    case AppActions.TOGGLE_FAVORITE:
      let updatedPosts = state?.posts.map((post: Post) => {
        if (post?.id === action.payload.id) {
          return {
            ...post,
            isFavorite: action.payload.value,
          };
        }
        return post;
      });

      updatedPosts = updatedPosts.sort((a, b) => {
        if (a.isFavorite && b.isFavorite) {
          return -1;
        }

        return b.isFavorite - a.isFavorite;
      });

      if (state?.modalState?.post?.id === action.payload.id) {
        state.modalState.post = {
          ...state?.modalState?.post,
          isFavorite: action.payload.value,
        };
      }

      return {
        ...state,
        posts: updatedPosts,
      };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  modalState: {
    open: false,
    data: null,
  },
};

const AppContext = createContext({});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const modalRef = useRef<HTMLDialogElement>(null);

  const addPosts = (posts: unknown[]) => {
    dispatch({
      type: AppActions.ADD_POSTS,
      payload: posts,
    });
  };

  const toggleFavorite = (id: string, value: boolean = false) => {
    if (!id) {
      return;
    }

    dispatch({
      type: AppActions.TOGGLE_FAVORITE,
      payload: {
        id,
        value,
      },
    });
  };

  const openModal = (post: Post) => {
    dispatch({
      type: AppActions.OPEN_MODAL,
      payload: {
        post,
      },
    });

    modalRef?.current?.showModal();
  };

  const closeModal = () => {
    dispatch({
      type: AppActions.CLOSE_MODAL,
      payload: {},
    });

    modalRef?.current?.close();
  };

  return (
    <AppContext.Provider
      value={{
        posts: state.posts,
        addPosts,
        toggleFavorite,
        openModal,
        closeModal,
      }}
    >
      {children}
      <Modal
        ref={modalRef}
        post={state?.modalState.post}
        closeModal={closeModal}
        toggleFavorite={toggleFavorite}
      />
    </AppContext.Provider>
  );
};

const AppConsumer = AppContext.Consumer;

export { AppContext, AppProvider, AppConsumer };
