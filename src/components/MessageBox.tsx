type MessageBoxProps = {
  children: React.ReactNode;
};

export function InfoBox({ children }: MessageBoxProps) {
  return (
    <div className={'info-box'}>
      <div style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
        Note: View browser console. Each render will be logged.
      </div>
      {children}
    </div>
  );
}
