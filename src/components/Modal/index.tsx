import { forwardRef, useImperativeHandle, useRef, MouseEvent } from "react";
import { Post } from "@/models/post";
import Clap from "../icons/Clap";
import Heart from "../icons/Heart";
import usePostComments from "@/hooks/usePostComments";

export interface ModalProps {
  post: Post | null;
  toggleFavorite?: (id: number, value: boolean) => void;
  closeModal: () => void;
}

const Modal = forwardRef<HTMLDialogElement | null, ModalProps>(
  ({ post, toggleFavorite, closeModal }, ref) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const {
      data: comments,
      isLoading,
      error,
    } = usePostComments(post ? post?.id : null);

    useImperativeHandle(ref, () => modalRef?.current as HTMLDialogElement, []);

    const onClickCross = () => {
      closeModal();
    };

    const onClickFavorite = (ev: MouseEvent<HTMLButtonElement>) => {
      if (typeof toggleFavorite === "function" && post?.id)
        toggleFavorite(post?.id, !post?.isFavorite);
    };

    return (
      <dialog
        className="open:shadow-lg p-6 rounded-lg backdrop:bg-gray-50/50 max-w-screen-sm"
        ref={modalRef}
      >
        <div className="flex flex-col w-full h-auto ">
          <div className="flex w-full h-auto justify-center items-center">
            <div className="flex w-full h-auto py-3 justify-center items-center text-2xl font-bold">
              {post?.title}
            </div>

            <div
              onClick={onClickCross}
              className="flex w-1/12 h-auto justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>

          <div className="flex w-full h-auto py-10 px-2 rounded text-center">
            {post?.body}
          </div>

          <div className="flex gap-x-2 items-end my-2">
            {Array.isArray(post?.tags) &&
              post?.tags.map((tag) => {
                return <span className="text-xs">{`#${tag}`}</span>;
              })}
          </div>

          <div className="flex items-center pt-4">
            <div className="flex flex-none w-14 justify-center">
              <Clap height={24} width={24} />
              <span className="ml-2">{post?.reactions}</span>
            </div>
            <div className="flex flex-none w-14 justify-center">
              <button onClick={onClickFavorite}>
                <Heart
                  height={24}
                  width={24}
                  className={
                    post?.isFavorite ? "fill-red-500" : "stroke-current"
                  }
                />
              </button>
            </div>
          </div>
          <div>
            <h2 className="pt-4 pb-2 text-base">Comments</h2>
            {isLoading ? (
              <p className="text-sm"> Loading ... </p>
            ) : comments?.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <div className="text-sm font-semibold pb-4" key={comment?.id}>
                    <span className="block mb-2">{`@${comment?.user?.username}`}</span>
                    <div className="flex w-full h-auto py-4 px-4 bg-gray-200 rounded text-gray-500 flex-col">
                      <p>{comment?.body}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : !!error ? (
              <p className="text-sm">Oops! Something went wrong. Stay tuned!</p>
            ) : null}
          </div>
        </div>
      </dialog>
    );
  }
);

export default Modal;
