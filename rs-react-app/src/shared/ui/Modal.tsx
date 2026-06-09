import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../app/context/hooks/useTheme';

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isOpen: boolean;
}
export default function Modal({
  children,
  title,
  onClose,
  isOpen,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      contentRef.current?.focus();
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusableElements =
        contentRef.current?.querySelectorAll<HTMLElement>(
          'input, button, input'
        );
      if (!focusableElements?.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const prevStateOverflowHTML = document.documentElement.style.overflow;
    const prevStateOverflowBody = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevStateOverflowHTML;
      document.body.style.overflow = prevStateOverflowBody;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClickOverlay = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="flex items-center justify-center bg-black/50 backdrop-blur-sm fixed inset-0 z-50"
      onClick={handleClickOverlay}
    >
      <div
        tabIndex={-1}
        className="
          relative w-full max-w-md mx-4
          bg-background border border-border
          rounded-xl shadow-2xl p-6
          flex flex-col gap-4
          outline-none
        "
        ref={contentRef}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`ml-auto px-2 py-1 rounded-md border border-border transition-colors cursor-pointer ${hoverClass}`}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
