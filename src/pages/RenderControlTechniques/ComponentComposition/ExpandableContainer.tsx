import { useRenderCounter } from '@/hooks/useRenderCounter';
import { useState, type ReactNode } from 'react';

function ExpandableContainer({ children }: { children: ReactNode }) {
  useRenderCounter('ExpandableContainer');

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={'form-layout'}>
      <button onClick={() => setIsExpanded(!isExpanded)} style={{ padding: '10px' }}>
        {isExpanded ? 'Collapse Section' : 'Expand Section'}
      </button>

      {children && isExpanded && <>{children}</>}
    </div>
  );
}

export default ExpandableContainer;
