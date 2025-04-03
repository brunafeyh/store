import React, {
    ForwardRefRenderFunction,
    ReactNode,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
  } from 'react';
  import './Popover.scss';
  
  interface Props {
    children: ReactNode;
  }
  
  export interface PopoverOptions {
    openPopover: (element: HTMLElement) => void;
    closePopover: () => void;
    isOpened: boolean;
  }
  
  const PopoverComponent: ForwardRefRenderFunction<PopoverOptions, Props> = (
    { children },
    ref
  ) => {
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
    const popoverRef = useRef<HTMLDivElement>(null);
  
    const openPopover = useCallback((element: HTMLElement) => {
      setAnchorElement(element);
      const rect = element.getBoundingClientRect();
      setPopoverStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX - 200, 
      });
    }, []);
  
    const closePopover = useCallback(() => {
      setAnchorElement(null);
      setPopoverStyle({});
    }, []);
  
    const isOpened = !!anchorElement;
  
    useEffect(() => {
      if (!isOpened) return;
  
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          closePopover();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpened, closePopover]);
  
    useImperativeHandle(ref, () => ({
      openPopover,
      closePopover,
      isOpened,
    }));
  
    return (
      <>
        {isOpened && (
          <div className="popover" style={popoverStyle} ref={popoverRef}>
            <div className="popover-container">{children}</div>
          </div>
        )}
      </>
    );
  };
  
  export const usePopover = () => React.useRef<PopoverOptions>(null);
  
  export const Popover = forwardRef(PopoverComponent);
  