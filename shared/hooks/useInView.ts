import { useEffect, useState, useRef, useCallback } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean; // 한 번만 감지할지 여부
}

export const useInView = (options?: UseInViewOptions) => {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // ref를 함수형으로 정의하여 DOM 요소가 마운트될 때 setNode를 호출합니다.
  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node);
  }, []);

  useEffect(() => {
    // 이전 옵저버가 있다면 연결 해제
    if (observer.current) observer.current.disconnect();

    if (node) {
      observer.current = new IntersectionObserver(([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);

        // 한 번만 실행 옵션이 있고 화면에 들어왔다면 관찰 중단
        if (isIntersecting && options?.triggerOnce) {
          observer.current?.unobserve(node);
        }
      }, options);

      observer.current.observe(node);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [node, options]);

  return { ref, inView };
};
