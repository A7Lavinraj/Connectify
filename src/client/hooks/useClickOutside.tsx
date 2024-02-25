import React from "react";

export default function useOnClickOutside() {
  const [state, setState] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  function clickHandler(event: MouseEvent) {
    if (ref.current?.contains(event.target as HTMLElement)) {
      setState(true);
    } else {
      setState(false);
    }
  }

  React.useEffect(() => {
    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  });

  return { ref, state, setState };
}
