import { useCallback, useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
}: Args) {
  const [node, setNode] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsVisible(entry?.isIntersecting);
  }, []);

  const setRef = useCallback(<T extends HTMLElement>(ref: T | null) => {
    setNode(ref);
  }, []);

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [node]);

  return [isVisible, setRef] as const;
}
