import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState, type ReactNode } from 'react';

type ExpandableContainerProps = {
  id: string;
  children: ReactNode;
};

function ExpandableContainer({ id, children }: ExpandableContainerProps) {
  useRenderCounter(`ExpandableContainer-${id}`);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="form-layout">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ padding: '10px' }}
        data-testid="expand-button"
      >
        {isExpanded ? `Collapse Section ${id}` : `Expand Section ${id}`}
      </button>

      {children && isExpanded && <>{children}</>}
    </div>
  );
}

export default ExpandableContainer;
